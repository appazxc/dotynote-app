import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostNestedEntity } from 'shared/types/entities/PostNestedEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostEntity = BaseEntity<{
  pinnedAt: string | null;
  pos: number;
  parentId: string;
  noteId: string;
  owner: string;
  nested: string;
  permissions: {
    delete: boolean;
    stick: boolean;
    unstick: boolean;
    move: boolean;
    pin: boolean;
    unpin: boolean;
    updateNested: boolean;
  };
}>

export type PostEntity = MergeEntity<ApiPostEntity, {
  note: NoteEntity;
  owner: UserEntity;
  nested: PostNestedEntity;
}>;