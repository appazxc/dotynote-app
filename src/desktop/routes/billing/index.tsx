import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from '../app';

export const billing = createRoute({
  getParentRoute: () => appRoute,
  path: 'billing',
  component: lazyRouteComponent(() => import('./Billing')),
});
