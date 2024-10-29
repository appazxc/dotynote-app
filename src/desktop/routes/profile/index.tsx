import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from '../app';

export const profile = createRoute({
  getParentRoute: () => appRoute,
  path: 'profile',
  component: lazyRouteComponent(() => import('./Profile')),
});
