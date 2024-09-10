import { createSelector } from '@reduxjs/toolkit';

import { canWriteNote } from 'shared/helpers/user/userRights';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { noteSelector } from 'shared/selectors/entities';

export const selectCanWriteNote = createSelector([
  (state, { noteId }) => noteSelector.getEntityById(state, noteId),
  selectUserId,
], 
(note, userId) => {
  return canWriteNote(note, userId);
});