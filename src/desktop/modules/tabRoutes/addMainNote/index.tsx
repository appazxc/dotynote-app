import { createRoute } from '@tanstack/react-router';

import { root } from '../root';

import { AddMainNote } from './AddMainNote';

export const addMainNote = createRoute({
  getParentRoute: () => root,
  path: 'addMainNote',
  component: AddMainNote,
});