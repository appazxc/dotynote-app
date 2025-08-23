import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

export const balance = createRoute({
  getParentRoute: () => appRoute,
  path: 'balance',
  component: lazyRouteComponent(() => import('./Balance')),
});