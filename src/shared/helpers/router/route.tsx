import { LoaderFunction, RouteObject, createBrowserRouter, defer } from 'react-router-dom';
import Loadable from 'shared/components/Loadable';
import { RouteRole, routeList } from 'shared/constants/routeList';
import * as userProtectedRoute from 'shared/routes/protected/UserRoute';
import { AppStore } from 'shared/store';
import { RouteLoader } from 'shared/types/common/router';
import { startPageLoading, stopPageLoading } from 'shared/modules/loaders/loadersSlice';

import { Defer } from './Defer';

const NotFound = Loadable(() => import(/* webpackChunkName: "NotFoundPage"  */ 'shared/routes/NotFound'));

export const createRouter = (params) => {
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
              loader: createLoader(loader, store, deferLoader),
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

const createLoader = (loader: RouteLoader, store: AppStore, deferLoader: RouteLoader): LoaderFunction => {
  return async (args) => {
    if (deferLoader) {
      if (loader) {
        await loader({ ...args, store });
      }

      store.dispatch(stopPageLoading());

      return defer({
        defer: deferLoader({ ...args, store }),
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
    ...getProtectedRoute(role, store),
    children: [route],
  };
};

const getProtectedRoute = (role: RouteRole, store: AppStore) => {
  const Component = userProtectedRoute.UserRoute;
  return {
    element: <Component />,
    // loader: createLoader(userProtectedRoute.loader, store),
  };
};
