import { createRoute, redirect } from '@tanstack/react-router';

import { api } from 'shared/api';
import { createSharedRoute } from 'shared/routes/createSharedRoute';
import ForbiddenUserStatus from 'shared/routes/forbiddenUserStatus/ForbiddenUserStatus';
import { Context } from 'shared/routes/routerContext';
import { selectUser } from 'shared/selectors/user/selectUser';

export const sharedForbiddenUserStatus = createSharedRoute(({ getParentRoute, Layout }) => {
  return createRoute({
    getParentRoute,
    path: 'forbidden-user-status',
    component: () => <ForbiddenUserStatus Layout={Layout} />,
    staleTime: Infinity,
    loader: async (ctx) => {
      const { store } = ctx.context as Context;
      const { getState } = store;

      await api.get('/users/me');
      const user = selectUser(getState());
      
      if (user?.status === 'active') {
        throw redirect({
          to: '/app',
        });
      }
    },
  });
});
