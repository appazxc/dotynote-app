import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { guest } from 'desktop/routes/guards';

export const idx = createRoute({
  getParentRoute: () => guest,
  path: '/',
  component: lazyRouteComponent(() => import('./Home')),
});