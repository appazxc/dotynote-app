import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostEntity = BaseEntity<{
  pos: number,
  parent: number,
  note: number,
  author: string,
  permissions: {
    delete: boolean,
    stick: boolean,
    unstick: boolean,
    move: boolean,
  }
}, number>

export type PostEntity = MergeEntity<ApiPostEntity, {
  note: NoteEntity,
  parent: NoteEntity,
  author: UserEntity,
}>;