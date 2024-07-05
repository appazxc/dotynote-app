import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

import { root } from '../root';

import Note from './Note';

export const note = createRoute({
  getParentRoute: () => root,
  path: 'n/$noteId',
  component: Note,
  loader: async ({ params }) => {
    console.log('loader', params.noteId);
    await queryClient.fetchQuery(options.notes.load(params.noteId));
  },
  // shouldReload: false,
});