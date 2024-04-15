import { createSelector } from '@reduxjs/toolkit';

import { addTo } from 'shared/modules/space/tabs/note/constants';
import { AppState } from 'shared/types/store';

import { selectCanAddToNote } from './selectCanAddToNote';
import { selectCanAddToPosts } from './selectCanAddToPosts';

export const selectAddTo = createSelector([
  selectCanAddToNote,
  selectCanAddToPosts,
  (state: AppState) => state.app.note.addTo,
], 
(canAddToNote, canAddToPosts, addToState) => {
  if (!canAddToNote) {
    return addTo.POSTS;
  }

  if (!canAddToPosts) {
    return addTo.NOTE;
  }

  return addToState;
});