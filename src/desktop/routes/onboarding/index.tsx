import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from '../app';

export const onboarding = createRoute({
  getParentRoute: () => appRoute,
  path: 'onboarding',
  component: lazyRouteComponent(() => import('./Onboarding')),
});
