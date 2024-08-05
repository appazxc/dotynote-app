import { createRoute, redirect } from '@tanstack/react-router';

import { appRoute } from 'desktop/routes/app';

export const tabs = createRoute({
  getParentRoute: () => appRoute,
  path: 'tabs',
  beforeLoad: () => {
    return redirect({
      to: '/app',
    });
  },
});