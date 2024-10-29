import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { z } from 'zod';

import { guest } from '../guards';

export const loginEmail = createRoute({
  getParentRoute: () => guest,
  path: 'loginemail',
  component: lazyRouteComponent(() => import('./LoginEmail')),
  validateSearch: z.object({
    email: z.string(),
    token: z.string(),
  }),
});
