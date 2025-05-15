import { NoteEntity } from 'shared/types/entities/NoteEntity';

export const canWriteNote = (note: NoteEntity | null, userId: string | null) => {
  if (!note || !userId) {
    return false;
  }

  return note.ownerId === userId;
};

export const canAddToNote = (note: NoteEntity | null, userId: string | null) => {
  if (!note || !userId) {
    return false;
  }

  return note.ownerId === userId;
};

export const canAddToPosts = (note: NoteEntity | null, userId: string | null) => {
  if (!note || !userId) {
    return false;
  }

  return note.ownerId === userId;
};