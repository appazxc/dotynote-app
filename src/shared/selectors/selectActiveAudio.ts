import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const selectActiveAudioId = (state: AppState) => state.audio.activeId;

export const selectActiveAudio = createSelector(
  [
    selectActiveAudioId, 
    (state: AppState) => state.entities.noteAudio,
  ],
  (audioId, entities) => {
    if (!audioId) {
      return null;
    }

    return entities[audioId] || null;
  }
);
