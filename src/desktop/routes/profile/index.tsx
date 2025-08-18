import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

import { appRoute } from '../app';

export const profile = createRoute({
  getParentRoute: () => appRoute,
  path: 'profile',
  component: lazyRouteComponent(() => import('./Profile')),
  loader: async () => {
    await queryClient.fetchQuery(options.users.userDeletionRequest());
  },
});
