import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

const NotFound = lazyRouteComponent(() => import('./NotFound'));

export const noteNotFound = createRoute({
  getParentRoute: () => root,
  path: '/note-not-found',
  component: () => <NotFound />,
});