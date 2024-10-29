import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { guest } from '../guards';

export const idx = createRoute({
  getParentRoute: () => guest,
  path: '/',
  component: lazyRouteComponent(() => import('./Home')),
});