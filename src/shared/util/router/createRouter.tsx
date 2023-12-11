import * as React from 'react';

import { LoaderFunction, LoaderFunctionArgs, createBrowserRouter, defer } from 'react-router-dom';

import { RouteListItem, routeList } from 'shared/constants/routeList';
import { RouteRole, roles } from 'shared/constants/routeList/roles';
import { startPageLoading, stopPageLoading } from 'shared/modules/loaders/loadersSlice';
import { guestGuard } from 'shared/routes/guards/guestGuard';
import { userGuard } from 'shared/routes/guards/userGuard';
import { AppStore } from 'shared/store';
import { Guard, RouteDictionary, RouteLoader } from 'shared/types/common/router';

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

type CreateLoader = (
  { 
    loader, 
    store, 
    deferLoader,
    route,
    guard,
  }: 
  { 
    loader?: RouteLoader, 
    store: AppStore, 
    deferLoader?: RouteLoader,
    route: RouteListItem,
    guard?: Guard,
  }
) => LoaderFunction

const guards: {
  [key in RouteRole]?: Guard
} = {
  [roles.user]: userGuard,
  [roles.guest]: guestGuard,
};

const createGuard = (store: AppStore, route: RouteListItem): Guard | undefined => {
  if (route.role) {
    return guards[route.role];
  }
};

const createLoader: CreateLoader = ({ loader, store, deferLoader, guard, route }): LoaderFunction => {
  
  return async (args: LoaderFunctionArgs) => {
    if (guard) {
      const response = await guard({ store, route, ...args });

      if (response) {
        return response;
      }
    }

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
              loader: createLoader({ loader, store, deferLoader, route, guard: createGuard(store, route) }),
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
