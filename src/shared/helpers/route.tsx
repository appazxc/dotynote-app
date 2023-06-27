import { createBrowserRouter } from 'react-router-dom';
import Loadable from 'shared/components/Loadable';
import { routeList } from 'shared/constants/routeList';
import { selectIsAuthorized } from 'shared/state/auth/auth.slice';

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

const createLoader = (loader, route, store) => {
  return async (params) => {
    const load = () => loader ? loader({ params, store }) || null : null;

    if (!route.authorize || selectIsAuthorized(store.getState())) {
      return load();
    }

    if (selectIsAuthorized(store.getState())) {
      return load();
    }

    return load();
  };
};
