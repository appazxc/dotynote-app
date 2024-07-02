import { createRoute, redirect } from '@tanstack/react-router';

import { selectIsAuthorized, selectToken } from 'shared/store/slices/authSlice';

import { Context } from './routerContext';

export const createGuestRoute = (params: Parameters<typeof createRoute>['0']) => createRoute(
  {
    ...params,
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

      await params.beforeLoad?.(ctx);
    },
  }
);