import { createSelector } from '@reduxjs/toolkit';

import { canWriteNote } from 'shared/helpers/user/userRights';
import { selectUserId } from 'shared/store/slices/authSlice';

import { noteSelector } from '../entities';

export const selectCanWriteNote = createSelector([
  (state, { noteId }) => noteSelector.getById(state, noteId),
  selectUserId,
], 
(note, userId) => {
  return canWriteNote(note, userId);
});