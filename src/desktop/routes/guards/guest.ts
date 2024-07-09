import { createRoute, redirect } from '@tanstack/react-router';

import { selectIsAuthorized, selectToken } from 'shared/store/slices/authSlice';

import { root } from '../root';
import { Context } from '../routerContext';

export const guest = createRoute({
  getParentRoute: () => root,
  id: 'guest',
  beforeLoad: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const state = store.getState();
    const isAuthorized = selectIsAuthorized(state);
    const token = selectToken(state);

    if (token || isAuthorized) {
      throw redirect({
        to: '/',
      });
    }
  },
});