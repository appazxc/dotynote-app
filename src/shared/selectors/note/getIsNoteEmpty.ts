import { createSelector } from '@reduxjs/toolkit';

import { noteSelector } from 'shared/selectors/entities';
import { AppState } from 'shared/types/store';

export const getIsNoteEmpty = createSelector(
  [
    (state: AppState, noteId: number) => noteSelector.getEntityById(state, noteId),
  ],
  (note) => {
    if (!note) {
      return true;
    }
console.log('note', note);
    const hasText = note.title;
    const hasContent = note.content;
    const hasFiles = note.files.length > 0;
    const hasImages = note.images.length > 0;
    const hasAudio = note.audio.length > 0;
    const hasVideo = note.videos.length > 0;

    return !hasText && !hasFiles && !hasImages && !hasAudio && !hasVideo && !hasContent;
  }
);
