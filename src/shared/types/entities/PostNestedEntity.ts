import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostNestedEntity = BaseEntity<{
  max: number;
  post: number;
}>

export type PostNestedEntity = MergeEntity<ApiPostNestedEntity, {
  post?: {
    id: string;
    note: {
      id: string;
      postsSettings: PostsSettingsEntity
    }
  }
}>;