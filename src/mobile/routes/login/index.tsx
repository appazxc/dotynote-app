import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { guest } from '../guards';

export const login = createRoute({
  getParentRoute: () => guest,
  path: 'login',
  component: lazyRouteComponent(() => import('./Login')),
});