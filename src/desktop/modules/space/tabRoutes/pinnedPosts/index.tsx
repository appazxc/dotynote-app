import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { noteTabLoader } from 'shared/modules/noteTab/noteTabLoader';

import { root } from '../root';

export const pinnedPosts = createRoute({
  getParentRoute: () => root,
  path: `${noteRoutePath}/pinned`,
  component: lazyRouteComponent(() => import('./PinnedPosts')),
  loader: async ({ params }) => {
    await noteTabLoader(Number(params.noteId));
  },
});
