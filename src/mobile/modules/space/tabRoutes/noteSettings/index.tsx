import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';

import { root } from '../root';

export const noteSettings = createRoute({
  getParentRoute: () => root,
  path: `${noteRoutePath}/settings`,
  component: lazyRouteComponent(() => import('./NoteSettings')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: params.noteId,
    });
  },
  notFoundComponent: NoteNotFound,
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: false,
});