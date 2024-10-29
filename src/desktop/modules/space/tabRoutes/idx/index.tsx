import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

export const idx = createRoute({
  getParentRoute: () => root,
  path: '/',
  component: lazyRouteComponent(() => import('./Home')),
});