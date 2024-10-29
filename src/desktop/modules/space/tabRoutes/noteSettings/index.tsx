import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { loadNoteData } from 'shared/util/loadNoteData';

import { root } from '../root';

export const noteSettings = createRoute({
  getParentRoute: () => root,
  path: `${noteRoutePath}/settings`,
  component: lazyRouteComponent(() => import('./NoteSettings')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: Number(params.noteId),
    });
  },
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: false,
});