import { createRoute } from '@tanstack/react-router';

import { guest } from '../guards';

import { Login } from './Login';

export const login = createRoute({
  getParentRoute: () => guest,
  path: 'login',
  component: Login,
});