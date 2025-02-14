import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { noteRoutePath } from 'shared/constants/noteRoutePath';

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
