import { createRoute } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

import { Settings } from './Settings';

export const settings = createRoute({
  getParentRoute: () => appRoute,
  path: 'settings',
  component: Settings,
});