import * as React from 'react';

import { LoaderFunction, createBrowserRouter, createMemoryRouter, defer } from 'react-router-dom';

import { Defer } from 'shared/components/Defer/Defer';
import { TabRouteListItem, tabRouteList } from 'shared/modules/space/constants/tabRouteList';
import { startPageLoading, stopPageLoading } from 'shared/store/slices/appSlice';
import { RouteLoader } from 'shared/types/common/router';
import { AppStore } from 'shared/types/store';
import { TabsDictionary } from 'shared/types/tabs';

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

export const createTabRouter: CreateRouter = (params) => {
  const { tabsDictionary, store, pages, memoryRouteParams } = params;

  return createMemoryRouter(
    [
      ...tabRouteList
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
              loader: createLoader({ loader, store, deferLoader, route }),
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
    memoryRouteParams
  );
};

type CreateLoader = (
  { 
    loader, 
    store, 
    deferLoader,
    route,
  }: 
  { 
    loader?: RouteLoader, 
    store: AppStore, 
    deferLoader?: RouteLoader,
    route: TabRouteListItem,
  }
) => LoaderFunction

const createLoader: CreateLoader = ({ loader, store, deferLoader, route }): LoaderFunction => {
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