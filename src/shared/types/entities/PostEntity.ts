import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';
import { PostInternalEntity } from 'shared/types/entities/PostInternalEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostEntity = BaseEntity<{
  pinnedAt: string | null;
  pos: number;
  parentId: string;
  noteId: string;
  owner: string;
  internal: string;
  permissions: {
    delete: boolean;
    stick: boolean;
    unstick: boolean;
    move: boolean;
    pin: boolean;
    unpin: boolean;
    updateInternal: boolean;
    upsertDot: boolean;
  };
  dots: string[];
}>

export type PostEntity = MergeEntity<ApiPostEntity, {
  note: NoteEntity;
  owner: UserEntity;
  internal: PostInternalEntity;
  dots: PostDotEntity[];
}>;