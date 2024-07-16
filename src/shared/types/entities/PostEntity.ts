import { BaseEntity } from './BaseEntity';

export type PostEntity = BaseEntity<{
  pos: number,
  parentId: string,
  noteId: string,
  authorId: string,
}>
