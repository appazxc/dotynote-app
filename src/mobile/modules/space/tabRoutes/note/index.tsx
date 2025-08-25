import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { useIsPrimaryNote } from 'shared/hooks/useIsPrimaryNote';
import { NotePending } from 'shared/modules/noteTab/components/NotePending';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

import { root } from '../root';

const PendingComponent = () => {
  const tab = useTabContext();
  const isPrimary = useIsPrimaryNote();
  const firstPageOfPrimaryNote = isPrimary && tab.routes.length === 1;

  return (
    <Layout header={<LayoutHeader showBackButton={!firstPageOfPrimaryNote} />}>
      <NotePending pt="4" />
    </Layout>
  );
};

export const note = createRoute({
  getParentRoute: () => root,
  path: noteRoutePath,
  component: lazyRouteComponent(() => import('./Note')),
  loader: async ({ params }) => {
    await loadNoteData({
      noteId: params.noteId,
    });
  },
  pendingComponent: PendingComponent,
  pendingMinMs: 0,
  // 200 from here + 350 from NotePending
  pendingMs: 200,
  shouldReload: ({ params }) => {
    const queryState = queryClient.getQueryState(options.notes.load(params.noteId).queryKey);

    return queryState?.isInvalidated || false;
  },
});