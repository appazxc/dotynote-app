import { createSelector } from '@reduxjs/toolkit';

import { canAddToPosts } from 'shared/helpers/user/userRights';
import { selectUserId } from 'shared/selectors/auth/selectUserId';

import { noteSelector } from '../entities';

export const selectCanAddToPosts = createSelector([
  (state, { noteId }) => noteSelector.getEntityById(state, noteId),
  selectUserId,
], 
(note, userId) => {
  return canAddToPosts(note, userId);
});