import { LoaderFunction, createBrowserRouter, createMemoryRouter, defer } from 'react-router-dom';
import * as React from 'react';
import { AppStore } from 'shared/store';
import { RouteLoader } from 'shared/types/common/router';
import { startPageLoading, stopPageLoading } from 'shared/modules/loaders/loadersSlice';

import { Defer } from 'shared/helpers/router/Defer';
import { AppRouteDictionary } from '../types/router';
import { appRouteList } from '../constants/appRouteList';

type CreateRouterParams = {
  store: AppStore,
  routeDictionary: AppRouteDictionary,
  pages: {
    notFoundPage: React.ReactElement,
    errorPage?: React.ReactElement,
    loadingPage?: React.ReactElement,
  },
  memoryRouteParams: {
    initialEntries: string[],
    initialIndex: number,
  }
}

type CreateRouter = (params: CreateRouterParams) => ReturnType<typeof createBrowserRouter>;

export const createRouter: CreateRouter = (params) => {
  const { routeDictionary, store, pages, memoryRouteParams } = params;

  return createMemoryRouter(
    [
      ...appRouteList
        .filter(route => routeDictionary[route.name])
        .map(route => {
          // store.dispatch(startPageLoading());

          const routeResolver = routeDictionary[route.name];

          const { Component, loader, deferLoader, element, loaderComponent } = routeResolver();

          const el = element || (Component ? <Component /> : null);

          return {
            path: route.path,
            element: deferLoader ?
              <Defer element={el} loader={loaderComponent || pages.loadingPage} /> 
              : el,
            loader: createLoader({ loader, store, deferLoader }),
            errorElement: pages.errorPage,
          };
        }),
      {
        path: '*',
        element: pages.notFoundPage,
      },
    ],
    memoryRouteParams,
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

      // store.dispatch(stopPageLoading());

      return defer({
        defer: (async () => await deferLoader({ ...args, store }) || null)(),
      });
    }

    let result;
    if (loader) {
      result = await loader({ ...args, store }) || null;
    }

    // store.dispatch(stopPageLoading());

    return result || null;
  };
};