import { LoaderFunction, createBrowserRouter } from 'react-router-dom';
import Loadable from 'shared/components/Loadable';
import { routeList } from 'shared/constants/routeList';
import { selectIsAuthorized } from 'shared/store/slices/authSlice';

const NotFound = Loadable(() => import(/* NotFoundPage */ 'shared/routes/NotFound'));

export const createRouter = (params) => {
  const { routeDictionary, store } = params;

  return createBrowserRouter(
    [
      ...routeList
        .filter(route => routeDictionary[route.name])
        .map(route => {
          return {
            path: route.path,
            lazy: async () => {
              const lazy = routeDictionary[route.name];
              const { Component, loader } = await lazy();

              return {
                Component,
                loader: createLoader(loader, route, store),
              };
            },
          };
        }),
      {
        path: '*',
        element: <NotFound />,
      },
    ]
  );
};

const createLoader = (loader, route, store): LoaderFunction => {
  return async (args) => {
    const load = async () => loader ? loader({ ...args, store }) || null : null;

    if (!route.authorize || selectIsAuthorized(store.getState())) {
      return load();
    }

    if (selectIsAuthorized(store.getState())) {
      return load();
    }

    return load();
  };
};
