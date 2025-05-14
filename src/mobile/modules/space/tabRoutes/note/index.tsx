import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { NotePending } from 'shared/modules/noteTab/components/NotePending';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

import { root } from '../root';

export const note = createRoute({
  getParentRoute: () => root,
  path: noteRoutePath,
  component: lazyRouteComponent(() => import('./Note')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: params.noteId,
    });
  },
  pendingComponent: () => (
    <Layout header={<LayoutHeader showBackButton />}>
      <NotePending pt="4" />
    </Layout>
  ),
  pendingMinMs: 0,
  // 200 from here + 350 from NotePending
  pendingMs: 200,
  shouldReload: ({ params }) => {
    const queryState = queryClient.getQueryState(options.notes.load(params.noteId).queryKey);

    return queryState?.isInvalidated || false;
  },
});