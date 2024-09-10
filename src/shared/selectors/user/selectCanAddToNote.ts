import { createSelector } from '@reduxjs/toolkit';

import { canAddToNote } from 'shared/helpers/user/userRights';
import { selectUserId } from 'shared/selectors/auth/selectUserId';

import { noteSelector } from '../entities';

export const selectCanAddToNote = createSelector([
  (state, { noteId }) => noteSelector.getEntityById(state, noteId),
  selectUserId,
], 
(note, userId) => {
  return canAddToNote(note, userId);
});