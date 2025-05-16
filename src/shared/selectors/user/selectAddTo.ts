import { createSelector } from '@reduxjs/toolkit';

import { addTo } from 'shared/modules/noteTab/constants';
import { noteSelector } from 'shared/selectors/entities';
import { AppState } from 'shared/types/store';

export const selectAddTo = createSelector([
  (state, { noteId }) => noteSelector.getEntityById(state, noteId),
  (state: AppState) => state.app.note.addTo,
], 
(note, addToState) => {
  if (!note) {
    return null;
  }

  if (note.permissions.update && addToState === addTo.NOTE && !note.settings?.hide) {
    return addTo.NOTE;
  }

  if (note.postsPermissions?.createPost) {
    return addTo.POSTS;
  }

  return null;
});