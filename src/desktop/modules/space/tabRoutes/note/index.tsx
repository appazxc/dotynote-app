import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';
import { loadNoteData } from 'shared/util/loadNoteData';

import { root } from '../root';

export const note = createRoute({
  getParentRoute: () => root,
  path: noteRoutePath,
  component: lazyRouteComponent(() => import('desktop/modules/noteTab/NoteTab')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: Number(params.noteId),
      extraLoaders: [
        queryClient.fetchQuery(options.posts.loadPinnedPostsCount(Number(params.noteId))),
      ],
    });
  },
  notFoundComponent: NoteNotFound,
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: ({ params }) => {
    const noteId = Number(params.noteId);
    const queryState = queryClient.getQueryState(options.notes.load(Number(noteId)).queryKey);

    return queryState?.isInvalidated || false;
  },
});
