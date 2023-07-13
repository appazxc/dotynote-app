import { LoaderFunction, RouteObject, createBrowserRouter, defer } from 'react-router-dom';
import Loadable from 'shared/components/Loadable';
import * as React from 'react';
import { routeList } from 'shared/constants/routeList';
import { UserRoute } from 'shared/routes/protected/UserRoute';
import { GuestRoute } from 'shared/routes/protected/GuestRoute';
import { AppStore } from 'shared/store';
import { RouteDictionary, RouteLoader } from 'shared/types/common/router';
import { startPageLoading, stopPageLoading } from 'shared/modules/loaders/loadersSlice';
import { RouteRole, roles } from 'shared/constants/routeList/roles';

import { Defer } from './Defer';

const NotFound = Loadable(() => import(/* webpackChunkName: "NotFoundPage"  */ 'shared/routes/NotFound'));

type CreateRouter = (params: { store: AppStore, routeDictionary: RouteDictionary }) => ReturnType<typeof createBrowserRouter>;

export const createRouter: CreateRouter = (params) => {
  const { routeDictionary, store } = params;

  return createBrowserRouter(
    [
      ...routeList
        .filter(route => routeDictionary[route.name])
        .map(route => {
          const lazy = async () => {
            store.dispatch(startPageLoading());

            const lazy = routeDictionary[route.name];
            const { default: resolve } = await lazy();

            const { Component, loader, deferLoader, element, loaderComponent } = await resolve();

            const el = element || (Component ? <Component /> : null);

            return {
              element: deferLoader ? <Defer element={el} loader={loaderComponent} /> : el,
              loader: createLoader({ loader, store, deferLoader }),
            };
          };

          const preparedRoute = {
            path: route.path,
            lazy,
          };

          return route.role
            ? withProtected(preparedRoute, route.role, store)
            : preparedRoute;
        }),
      {
        path: '*',
        element: <NotFound />,
      },
    ]
  );
};

type CreateLoader = ({ loader, store, deferLoader }: { store: AppStore, loader?: RouteLoader, deferLoader?: RouteLoader }) => LoaderFunction

const createLoader: CreateLoader = ({ loader, store, deferLoader }): LoaderFunction => {
  return async (args) => {
    if (deferLoader) {
      if (loader) {
        await loader({ ...args, store });
      }

      store.dispatch(stopPageLoading());

      return defer({
        defer: (async () => await deferLoader({ ...args, store }) || null)(),
      });
    }

    let result;
    if (loader) {
      result = await loader({ ...args, store }) || null;
    }

    store.dispatch(stopPageLoading());

    return result || null;
  };
};

const withProtected = (route: RouteObject, role: RouteRole, store: AppStore) => {
  return {
    ...getProtectedRoute(role),
    children: [route],
  };
};

const protectedRoutes: {
  [key in RouteRole]?: React.ComponentType
} = {
  [roles.user]: UserRoute,
  [roles.guest]: GuestRoute,
};

const getProtectedRoute = (role: RouteRole) => {
  const Component = protectedRoutes[role];

  if (!Component) {
    throw new Error('Protected route component is missing');
  }

  return {
    element: <Component />,
  };
};
