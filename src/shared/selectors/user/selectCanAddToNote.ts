import { createSelector } from '@reduxjs/toolkit';

import { canAddToNote } from 'shared/helpers/user/userRights';
import { selectUserId } from 'shared/store/slices/authSlice';

import { noteSelector } from '../entities';

export const selectCanAddToNote = createSelector([
  (state, { noteId }) => noteSelector.getById(state, noteId),
  selectUserId,
], 
(note, userId) => {
  return canAddToNote(note, userId);
});