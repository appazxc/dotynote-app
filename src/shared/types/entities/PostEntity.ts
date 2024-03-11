import { BaseEntity } from './BaseEntity';

export type PostEntity = BaseEntity<{
  pos: number,
  parentId: number,
  noteId: number,
  authorId: string,
}>
