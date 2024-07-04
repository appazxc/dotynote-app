import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

import { root } from '../root';

export const note = createRoute({
  getParentRoute: () => root,
  path: 'n/$noteId',
  component: lazyRouteComponent(() => import('./Note')),
  loader: async ({ params }) => {
    await queryClient.fetchQuery(options.notes.load(params.noteId));
  },
});