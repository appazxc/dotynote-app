import { createAuthRoute } from '../createAuthRoute';
import { root } from '../root';

import { Spaces } from './Spaces';

export const spaces = createAuthRoute({
  getParentRoute: () => root,
  path: 'spaces',
  component: Spaces,
});