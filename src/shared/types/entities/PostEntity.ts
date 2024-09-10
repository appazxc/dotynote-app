import { BaseEntity } from './BaseEntity';

export type ApiPostEntity = BaseEntity<{
  pos: number,
  parentId: number,
  noteId: number,
  authorId: string,
}, number>

export type PostEntity = ApiPostEntity;