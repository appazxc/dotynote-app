import { createRoute, redirect } from '@tanstack/react-router';

import { selectToken } from 'shared/selectors/auth/selectToken';

import { root } from '../root';
import { Context } from '../routerContext';

export const guest = createRoute({
  getParentRoute: () => root,
  id: 'guest',
  beforeLoad: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const state = store.getState();
    const token = selectToken(state);

    if (token) {
      throw redirect({
        to: '/primary',
      });
    }
  },
});