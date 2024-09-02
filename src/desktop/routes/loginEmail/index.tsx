import { createRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { guest } from '../guards';

import { LoginEmail } from './LoginEmail';

export const loginEmail = createRoute({
  getParentRoute: () => guest,
  path: 'loginemail',
  component: LoginEmail,
  validateSearch: z.object({
    email: z.string(),
    token: z.string(),
  }),
});
