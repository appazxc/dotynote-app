import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const selectAllPostsWithConcreteNote = createSelector([
  (state: AppState) => state.entities,
  (_, noteId) => noteId,
], 
(entities, noteId) => {
  return Object.values(entities.post).filter((post) => post.noteId === noteId);
});