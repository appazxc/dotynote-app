import { createSelector } from '@reduxjs/toolkit';

import { canAddToPosts } from 'shared/helpers/user/userRights';
import { selectUserId } from 'shared/store/slices/authSlice';

import { noteSelector } from '../entities';

export const selectCanAddToPosts = createSelector([
  (state, { noteId }) => noteSelector.getById(state, noteId),
  selectUserId,
], 
(note, userId) => {
  return canAddToPosts(note, userId);
});