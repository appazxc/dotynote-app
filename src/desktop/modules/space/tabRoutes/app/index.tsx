import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadSpaces } from 'shared/actions/space/loadSpaces';
import { openTab } from 'shared/actions/space/openTab';
import { Loader } from 'shared/components/Loader';
import { cleanWaitedRoute, selectActiveSpace } from 'shared/store/slices/appSlice';

import { createAuthRoute } from '../createAuthRoute';
import { root } from '../root';
import { Context } from '../routerContext';

export const app = createAuthRoute({
  getParentRoute: () => root,
  path: 'app',
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