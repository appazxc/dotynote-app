import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostInternalEntity } from 'shared/types/entities/PostInternalEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostEntity = BaseEntity<{
  pinnedAt: string | null,
  pos: number,
  parent: number,
  note: number,
  author: string,
  internal: string,
  permissions: {
    delete: boolean,
    stick: boolean,
    remove: boolean,
    move: boolean,
    pin: boolean,
    unpin: boolean,
    updateInternal: boolean,
  }
}, number>

export type PostEntity = MergeEntity<ApiPostEntity, {
  note: NoteEntity,
  parent: NoteEntity,
  author: UserEntity,
  internal: PostInternalEntity,
}>;