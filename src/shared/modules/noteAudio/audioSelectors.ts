import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const selectActiveAudio = createSelector([
  (state: AppState) => state.entities.noteAudio,
  (state: AppState) => state.audio.audioId,
], (audioById, audioId) => {
  return audioId ? audioById[audioId] : null;
});

export const selectAudioUrl: (state: AppState) => string | null = createSelector([
  (state: AppState) => state.entities.noteAudio,
  (state: AppState) => state.audio.audioId,
], (audioById, audioId) => {
  return audioId ? audioById[audioId]?.url || null : null;
});

export const selectIsAudioPlaying = (state: AppState) => state.audio.isPlaying;