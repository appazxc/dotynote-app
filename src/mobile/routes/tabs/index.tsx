import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadSpaces } from 'shared/actions/route/loadSpaces';

import { appRoute } from 'mobile/routes/app';
import { Context } from 'mobile/routes/routerContext';

export const tabs = createRoute({
  getParentRoute: () => appRoute,
  path: 'tabs',
  component: lazyRouteComponent(() => import('./Tabs')),
  loader: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const { dispatch } = store;

    await dispatch(loadSpaces(ctx.location.pathname));
  },
});