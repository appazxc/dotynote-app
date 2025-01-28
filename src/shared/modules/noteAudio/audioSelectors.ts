import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const selectAudioUrl: (state: AppState, audioId: string | null) => string | null = createSelector([
  (state: AppState) => state.entities.noteAudio,
  (_, audioId: string | null) => audioId,
], (audioById, audioId) => {
  return audioId ? audioById[audioId]?.url || null : null;
});
