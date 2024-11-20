import { createSelector } from '@reduxjs/toolkit';

import { addTo } from 'shared/modules/noteTab/constants';
import { noteSelector } from 'shared/selectors/entities';
import { AppState } from 'shared/types/store';

export const selectAddTo = createSelector([
  (state, { noteId }) => noteSelector.getById(state, noteId)?.permissions,
  (state: AppState) => state.app.note.addTo,
], 
(permissions, addToState) => {
  if (!permissions) {
    return addToState;
  }

  if (!permissions.update) {
    return addTo.POSTS;
  }

  if (!permissions.createPost) {
    return addTo.NOTE;
  }

  return addToState;
});