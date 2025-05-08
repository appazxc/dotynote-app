import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';

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
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: false,
});