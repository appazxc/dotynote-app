import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from '../app';

export const balance = createRoute({
  getParentRoute: () => appRoute,
  path: 'balance',
  component: lazyRouteComponent(() => import('./Balance')),
});
