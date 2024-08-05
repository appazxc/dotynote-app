import { createRoute } from '@tanstack/react-router';

import { guest } from '../guards';

import { Home } from './Home';

export const idx = createRoute({
  getParentRoute: () => guest,
  path: '/',
  component: Home,
});