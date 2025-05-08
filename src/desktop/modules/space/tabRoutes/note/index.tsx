import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { z } from 'zod';

import { loadNoteData } from 'shared/api/loadNoteData';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { NotePending } from 'shared/modules/noteTab/components/NotePending';
import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';

import { NoteTabError } from 'desktop/modules/space/tabRoutes/note/NoteTabError';

import { root } from '../root';

const NoteTab = lazyRouteComponent(() => import('desktop/modules/noteTab/NoteTab'));

export const note = createRoute({
  getParentRoute: () => root,
  path: noteRoutePath,
  component: () => <NoteTab />,
  validateSearch: z.object({
    parent: z.string().optional(),
  }),
  loaderDeps: ({ search: { parent } }) => ({ parent }),
  loader: async ({ params, deps: { parent } }) => {
    await loadNoteData({
      noteId: params.noteId,
      extraLoaders: [
        ...parent ? [queryClient.fetchQuery(options.notes.load(parent))] : [],
      ],
    });
  },
  pendingComponent: NotePending,
  notFoundComponent: NoteNotFound,
  errorComponent: NoteTabError,
  pendingMinMs: 0,
  // 200 from here + 350 from NotePending
  pendingMs: 200,
  shouldReload: ({ params }) => {
    const queryState = queryClient.getQueryState(options.notes.load(params.noteId).queryKey);

    return queryState?.isInvalidated || false;
  },
});