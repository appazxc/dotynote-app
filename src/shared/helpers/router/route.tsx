import { LoaderFunction, createBrowserRouter, defer } from 'react-router-dom';
import * as React from 'react';
import { routeList } from 'shared/constants/routeList';
import { AppStore } from 'shared/store';
import { RouteDictionary, RouteLoader } from 'shared/types/common/router';
import { startPageLoading, stopPageLoading } from 'shared/modules/loaders/loadersSlice';

import { Defer } from './Defer';

type CreateRouterParams = {
  store: AppStore,
  routeDictionary: RouteDictionary,
  pages: {
    notFoundPage: React.ReactElement,
    errorPage?: React.ReactElement,
    loadingPage?: React.ReactElement,
  }
}
type CreateRouter = (params: CreateRouterParams) => ReturnType<typeof createBrowserRouter>;

export const createRouter: CreateRouter = (params) => {
  const { routeDictionary, store, pages } = params;

  return createBrowserRouter(
    [
      ...routeList
        .filter(route => routeDictionary[route.name])
        .map(route => {
          const lazy = async () => {
            store.dispatch(startPageLoading());

            const lazyLoader = routeDictionary[route.name]!;
            const { default: resolve } = await lazyLoader();

            const { Component, loader, deferLoader, element, loaderComponent } = await resolve();

            const el = element || (Component ? <Component /> : null);

            return {
              element: deferLoader ?
                <Defer element={el} loader={loaderComponent || pages.loadingPage} /> 
                : el,
              loader: createLoader({ loader, store, deferLoader }),
              errorElement: pages.errorPage,
            };
          };

          const preparedRoute = {
            path: route.path,
            lazy,
          };

          return preparedRoute;
        }),
      {
        path: '*',
        element: pages.notFoundPage,
      },
    ]
  );
};

type CreateLoader = (
  { 
    loader, 
    store, 
    deferLoader
  }: 
  { 
    loader?: RouteLoader, 
    store: AppStore, 
    deferLoader?: RouteLoader
  }
) => LoaderFunction

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

// const withProtected = (route: RouteObject, role: RouteRole) => {
//   return {
//     ...getProtectedRoute(role),
//     children: [route],
//   };
// };

// const protectedRoutes: {
//   [key in RouteRole]?: React.ComponentType
// } = {
//   [roles.user]: UserRoute,
//   [roles.guest]: GuestRoute,
// };

// const getProtectedRoute = (role: RouteRole) => {
//   const Component = protectedRoutes[role];

//   if (!Component) {
//     throw new Error('Protected route component is missing');
//   }

//   return {
//     element: <Component />,
//   };
// };
