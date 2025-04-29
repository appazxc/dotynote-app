import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

const Search = lazyRouteComponent(() => import('./Search'));

export const search = createRoute({
  getParentRoute: () => root,
  path: '/search',
  component: () => <Search />,
});