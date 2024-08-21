import { createRoute, lazyRouteComponent, notFound, redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { wait } from 'shared/util/wait';

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

    try {
      await queryClient.fetchQuery(options.notes.load(Number(activeSpace?.mainNoteId)));
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        throw err;
      }

      throw notFound();
    }
  },
  pendingComponent: LayoutLoader,
  notFoundComponent: NoteNotFound,
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: false,
});