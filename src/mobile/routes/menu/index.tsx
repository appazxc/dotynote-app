import { createRoute } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

import { Menu } from './Menu';

export const menu = createRoute({
  getParentRoute: () => appRoute,
  path: 'menu',
  component: Menu,
});