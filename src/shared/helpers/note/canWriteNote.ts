import { NoteEntity } from 'shared/types/entities/NoteEntity';

export const canWriteNote = (note: NoteEntity, userId: string) => {
  return note.authorId === userId;
};