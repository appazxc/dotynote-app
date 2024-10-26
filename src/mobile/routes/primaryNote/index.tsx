import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';

import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';
import { noteTabLoader } from 'shared/modules/noteTab/noteTabLoader';
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

    await noteTabLoader(activeSpace?.mainNoteId, { shouldRedirect: false });
  },
  pendingComponent: LayoutLoader,
});