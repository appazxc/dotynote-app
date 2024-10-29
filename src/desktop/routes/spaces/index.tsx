import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from '../app';

export const spaces = createRoute({
  getParentRoute: () => appRoute,
  path: 'spaces',
  component: lazyRouteComponent(() => import('./Spaces')),
});
