import { createRoute, redirect } from '@tanstack/react-router';

import { getUser } from 'shared/actions/auth';
import { BACK_URL } from 'shared/constants/queryKeys';
import { selectIsAuthorized, selectToken } from 'shared/store/slices/authSlice';

import { Context } from './routerContext';

export const createAuthRoute = (params: Parameters<typeof createRoute>['0']) => createRoute(
  {
    ...params,
    beforeLoad: async (ctx) => {
      const context = ctx.context as Context;
      const { store } = context;
      const state = store.getState();
      const { href } = ctx.location;
      const isAuthorized = selectIsAuthorized(state);
      const token = selectToken(state);

      if (!token) {
        throw redirect({
          to: '/',
          search: {
            [BACK_URL]: href,
          },
        });
      }
    
      if (!isAuthorized) {
        await store.dispatch(getUser());
      }

      await params.beforeLoad?.(ctx);
    },
  }
);