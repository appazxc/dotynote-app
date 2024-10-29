import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

export const menu = createRoute({
  getParentRoute: () => appRoute,
  path: 'menu',
  component: lazyRouteComponent(() => import('./Menu')),
});