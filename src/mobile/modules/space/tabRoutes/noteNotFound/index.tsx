import { createRoute } from '@tanstack/react-router';

import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';

import { root } from '../root';

export const noteNotFound = createRoute({
  getParentRoute: () => root,
  path: '/note-not-found',
  component: NoteNotFound,
});