import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { auth } from 'mobile/routes/guards';

export const onboarding = createRoute({
  getParentRoute: () => auth,
  path: '/app/onboarding',
  component: lazyRouteComponent(() => import('./Onboarding')),
});
