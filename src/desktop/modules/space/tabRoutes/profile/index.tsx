import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

export const profile = createRoute({
  getParentRoute: () => root,
  path: 'profile',
  component: lazyRouteComponent(() => import('./Profile')),
});