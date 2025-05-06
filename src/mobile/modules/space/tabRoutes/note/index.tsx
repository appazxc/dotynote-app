import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { NotePending } from 'shared/modules/noteTab/components/NotePending';

import { Layout } from 'mobile/components/Layout';

import { root } from '../root';

export const note = createRoute({
  getParentRoute: () => root,
  path: noteRoutePath,
  component: lazyRouteComponent(() => import('./Note')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: Number(params.noteId),
    });
  },
  pendingComponent: () => (
    <Layout>
      <NotePending />
    </Layout>
  ),
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: ({ params }) => {
    const noteId = Number(params.noteId);
    const queryState = queryClient.getQueryState(options.notes.load(Number(noteId)).queryKey);

    return queryState?.isInvalidated || false;
  },
});