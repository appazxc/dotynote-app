import { createRoute } from '@tanstack/react-router';

import { root } from '../root';

import { Home } from './Home';

export const idx = createRoute({
  getParentRoute: () => root,
  path: '/',
  component: Home,
});