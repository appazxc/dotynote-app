import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

export const noteSettings = createRoute({
  getParentRoute: () => root,
  path: 'settings/note',
  component: lazyRouteComponent(() => import('./NoteSettings')),
});