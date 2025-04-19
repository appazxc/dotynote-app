import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostInternalEntity = BaseEntity<{
  max: number;
  post: number;
}>

export type PostInternalEntity = MergeEntity<ApiPostInternalEntity, {
  post?: {
    id: number;
    note: {
      id: number;
      postsSettings: PostsSettingsEntity
    }
  }
}>;