import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';

import { selectUser } from 'shared/selectors/user/selectUser';

import { appRoute } from '../app';
import { Context } from '../routerContext';

export const onboarding = createRoute({
  getParentRoute: () => appRoute,
  path: 'onboarding',
  component: lazyRouteComponent(() => import('./Onboarding')),
  beforeLoad: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const state = store.getState();
    const user = selectUser(state);
    
    if (user?.region) {
      throw redirect({
        to: '/app',
      });
    }
  },
});
