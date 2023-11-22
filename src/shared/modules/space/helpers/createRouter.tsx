import { LoaderFunction, createBrowserRouter, createMemoryRouter, defer } from 'react-router-dom';
import * as React from 'react';
import { AppStore } from 'shared/store';
import { RouteLoader } from 'shared/types/common/router';
import { startPageLoading, stopPageLoading } from 'shared/store/slices/appSlice';

import { Defer } from 'shared/helpers/router/Defer';
import { TabsDictionary } from 'shared/types/tabs';
import { tabList } from 'shared/modules/space/constants/tabRouteList';

export type CreateRouterParams = {
  store: AppStore,
  tabsDictionary: TabsDictionary,
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
  const { tabsDictionary, store, pages, memoryRouteParams } = params;

  return createMemoryRouter(
    [
      ...tabList
        .filter(route => tabsDictionary[route.name])
        .map(route => {
          const lazy = async () => {
            const lazyLoader = tabsDictionary[route.name]!;
            
            const { default: resolve } = await lazyLoader();

            const { Component, loader, deferLoader, element, loaderComponent } = resolve();

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
    store.dispatch(startPageLoading());

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