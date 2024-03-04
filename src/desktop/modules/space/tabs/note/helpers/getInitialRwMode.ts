import { canWriteNote } from 'shared/helpers/note/canWriteNote';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { rwModes } from '../constants';

export const getInitialRwMode = (note: NoteEntity, userId: string) => {
  const canWrite = canWriteNote(note, userId);

  if (!canWrite) {
    return rwModes.NONE;
  }

  if (note.access === 'PRIVATE') {
    return rwModes.WRITE;
  }

  return rwModes.READ;
};