import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadSpaces } from 'shared/actions/space/loadSpaces';
import { openTab } from 'shared/actions/space/openTab';
import { Loader } from 'shared/components/Loader';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { cleanWaitedRoute } from 'shared/store/slices/appSlice';

import { auth } from '../guards';
import { Context } from '../routerContext';
import { spaces } from '../spaces';

export const appRoute = createRoute({
  getParentRoute: () => auth,
  path: 'app',
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  loader: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const { dispatch, getState } = store;
  
    await dispatch(loadSpaces());
    const activeSpace = selectActiveSpace(getState());
  
    const { waitedRoute } = getState().app;
  
    if (waitedRoute && activeSpace) {
      await dispatch(openTab({ route: waitedRoute, makeActive: true }));
      dispatch(cleanWaitedRoute());
    }
  },
  pendingComponent: Loader,
  component: lazyRouteComponent(() => import('desktop/modules/space')),
});

export const app = auth.addChildren([
  appRoute.addChildren([appIndexRoute, spaces]),
]);