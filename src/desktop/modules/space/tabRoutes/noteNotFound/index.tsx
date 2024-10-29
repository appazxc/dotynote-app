import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

export const noteNotFound = createRoute({
  getParentRoute: () => root,
  path: '/note-not-found',
  component: lazyRouteComponent(() => import('shared/modules/noteTab/NoteNotFound')),
});