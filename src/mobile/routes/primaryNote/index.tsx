import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadNoteData } from 'shared/api/loadNoteData';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { Context } from 'mobile/routes/routerContext';

import { appRoute } from '../app';

export const primaryNote = createRoute({
  getParentRoute: () => appRoute,
  path: 'primary',
  component: lazyRouteComponent(() => import('./PrimaryNoteBase')),
  loader: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const state = store.getState();

    const activeSpace = selectActiveSpace(state);

    if (activeSpace?.mainNoteId) {
      await loadNoteData({
        noteId: activeSpace?.mainNoteId,
        flags: {
          shouldRedirect: false,
        },
      });
    }
  },
  pendingComponent: LayoutLoader,
});