import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { noteRoutePath } from 'shared/constants/noteRoutePath';

import { root } from '../root';

export const notePostsSettings = createRoute({
  getParentRoute: () => root,
  path: `${noteRoutePath}/posts-settings`,
  component: lazyRouteComponent(() => import('./NotePostsSettings')),
  loader: async ({ params }) => {
    try {
      await queryClient.fetchQuery(options.notes.load(Number(params.noteId)));
      await queryClient.fetchQuery(options.notes.loadOrderByList());
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        // if 404 loader will always call refetch
        throw redirect({
          to: '/note-not-found',
        });
      }
      
      throw err;
    }
  },
  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: false,
});