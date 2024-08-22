import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

export const search = createRoute({
  getParentRoute: () => appRoute,
  path: 'search',
  component: lazyRouteComponent(() => import('./Search')),
});