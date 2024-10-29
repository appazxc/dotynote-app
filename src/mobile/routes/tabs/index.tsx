import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

export const tabs = createRoute({
  getParentRoute: () => appRoute,
  path: 'tabs',
  component: lazyRouteComponent(() => import('./Tabs')),
});