import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

export const profile = createRoute({
  getParentRoute: () => appRoute,
  path: 'profile',
  component: lazyRouteComponent(() => import('./Profile')),
});