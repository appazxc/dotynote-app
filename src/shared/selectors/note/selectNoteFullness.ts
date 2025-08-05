import { createSelector } from '@reduxjs/toolkit';

import { selectIsNoteFilesUploading } from 'shared/modules/fileUpload/fileUploadSelectors';
import { noteSelector } from 'shared/selectors/entities';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { AppState } from 'shared/types/store';
import { getIsNoteContentEmpty } from 'shared/util/getIsNoteContentEmpty';

export const getNoteFullness = (note?: NoteEntity | null) => {
  if (!note) {
    return {
      isTextContentEmpty: true,
      isAttachmentsEmpty: true,
      isContentEmpty: true,
      isNoteEmpty: true,
    };
  }

  const isContentEmpty = getIsNoteContentEmpty(note.content);
  const isTextContentEmpty = !note.title && isContentEmpty;
  const isAttachmentsEmpty = 
    note.files.length === 0 
    && note.images.length === 0 
    && note.audio.length === 0 
    && note.videos.length === 0;
  const isNoteEmpty = isTextContentEmpty && isAttachmentsEmpty;

  return {
    isTextContentEmpty,
    isAttachmentsEmpty,
    isContentEmpty,
    isNoteEmpty,
  };
};

export const selectNoteFullness = createSelector(
  [
    (state: AppState, noteId: string) => noteSelector.getEntityById(state, noteId),
    (state: AppState, noteId: string) => selectIsNoteFilesUploading(state, noteId),
  ],
  (note, isFilesUploading) => {
    return {
      ...getNoteFullness(note),
      isFilesUploading,
    };
  }
);