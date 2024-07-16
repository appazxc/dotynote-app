import { createRoute, redirect } from '@tanstack/react-router';

import { getUser } from 'shared/actions/auth';
import { BACK_URL } from 'shared/constants/queryKeys';
import { selectIsAuthenticated } from 'shared/selectors/auth/selectIsAuthenticated';
import { selectToken } from 'shared/selectors/auth/selectToken';

import { root } from '../root';
import { Context } from '../routerContext';

export const auth = createRoute({
  getParentRoute: () => root,
  id: 'auth',
  beforeLoad: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const state = store.getState();
    const { href } = ctx.location;
    const isAuthenticated = selectIsAuthenticated(state);
    const token = selectToken(state);

    if (!token) {
      throw redirect({
        to: '/',
        search: {
          [BACK_URL]: href,
        },
      });
    }
    
    if (!isAuthenticated) {
      await store.dispatch(getUser());
    }
  },
  onError: () => {
    throw redirect({
      to: '/',
    });
  },
});