import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { Context } from 'mobile/routes/routerContext';

import { appRoute } from '../app';

export const primaryNote = createRoute({
  getParentRoute: () => appRoute,
  path: 'primary',
  component: lazyRouteComponent(() => import('./PrimaryNote')),
  loader: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const state = store.getState();

    const activeSpace = selectActiveSpace(state);

    if (!activeSpace?.mainNoteId) {
      store.dispatch(showModal({ id: modalIds.primaryNote }));
      throw redirect({
        to: '/app',
      });
    }

    await loadNoteData({
      noteId: activeSpace?.mainNoteId,
      extraLoaders: [
        queryClient.fetchQuery(options.posts.loadPinnedPostsCount(activeSpace?.mainNoteId)),
      ],
      flags: {
        shouldRedirect: false,
      },
    });
  },
  pendingComponent: LayoutLoader,
});