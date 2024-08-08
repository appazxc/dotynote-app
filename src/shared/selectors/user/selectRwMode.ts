import { createSelector } from '@reduxjs/toolkit';

import { rwModes } from 'shared/modules/tabRoutes/note/constants';
import { AppState } from 'shared/types/store';

import { selectCanWriteNote } from './selectCanWriteNote';

export const selectRwMode = createSelector([
  selectCanWriteNote,
  (state: AppState) => state.app.note.rwMode,
], 
(canWriteNote, rwMode) => {
  return canWriteNote ? rwMode : rwModes.READ;
});