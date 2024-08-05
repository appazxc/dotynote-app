import { createRoute } from '@tanstack/react-router';

import { guest } from 'desktop/routes/guards';

import { Home } from './Home';

export const idx = createRoute({
  getParentRoute: () => guest,
  path: '/',
  component: Home,
});