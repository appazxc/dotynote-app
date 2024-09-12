import { createRoute, lazyRouteComponent, notFound } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';

import { root } from '../root';

export const noteRoutePath = '/n/$noteId';

export const note = createRoute({
  getParentRoute: () => root,
  path: noteRoutePath,
  component: lazyRouteComponent(() => import('desktop/modules/noteTab/NoteTab')),
  loader: async ({ params }) => {
    try {
      await queryClient.fetchQuery(options.notes.load(Number(params.noteId)));
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        throw err;
      }

      throw notFound();
    }
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
