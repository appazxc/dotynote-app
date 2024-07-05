import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

export const settings = createRoute({
  getParentRoute: () => root,
  path: 'settings',
  component: lazyRouteComponent(() => import('./Settings')),
});