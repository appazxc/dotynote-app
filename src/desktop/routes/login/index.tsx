import { createGuestRoute } from '../createGuestRoute';
import { root } from '../root';

import { Login } from './Login';

export const login = createGuestRoute({
  getParentRoute: () => root,
  path: 'login',
  component: Login,
});