import { IdentityType } from 'shared/types/entities/BaseEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

export const canWriteNote = (note: NoteEntity | null, userId: IdentityType | null) => {
  if (!note || !userId) {
    return false;
  }

  return note.authorId === userId;
};

export const canAddToNote = (note: NoteEntity | null, userId: IdentityType | null) => {
  if (!note || !userId) {
    return false;
  }

  return note.authorId === userId;
};

export const canAddToPosts = (note: NoteEntity | null, userId: IdentityType | null) => {
  if (!note || !userId) {
    return false;
  }

  return note.authorId === userId;
};