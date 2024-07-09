import { createRoute } from '@tanstack/react-router';

import { guest } from '../guards';

import { Login } from './Login';

const loginRoute = createRoute({
  getParentRoute: () => guest,
  path: 'login',
  component: Login,
});

export const login = guest.addChildren([loginRoute]);