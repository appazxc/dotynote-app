import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { loadNoteData } from 'shared/util/loadNoteData';

import { root } from '../root';

export const pinnedPosts = createRoute({
  getParentRoute: () => root,
  path: `${noteRoutePath}/pinned`,
  component: lazyRouteComponent(() => import('./PinnedPosts')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: Number(params.noteId),
    });
  },
});
