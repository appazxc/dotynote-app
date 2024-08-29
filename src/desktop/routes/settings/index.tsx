import { createRoute } from '@tanstack/react-router';

import { appRoute } from '../app';

import { Settings } from './Settings';

export const settings = createRoute({
  getParentRoute: () => appRoute,
  path: 'settings',
  component: Settings,
});
