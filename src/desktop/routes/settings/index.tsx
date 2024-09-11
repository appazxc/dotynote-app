import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from '../app';

export const settings = createRoute({
  getParentRoute: () => appRoute,
  path: 'settings',
  component: lazyRouteComponent(() => import('./Settings')),
});
