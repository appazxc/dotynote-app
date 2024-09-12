import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostsSettingsEntity = BaseEntity<{
  display: boolean,
  // comments: boolean,
  // stickType: 'simple' | 'multi' | 'auto' | 'gpt',
  // stickFrom: string[],
}>

export type PostsSettingsEntity = MergeEntity<ApiPostsSettingsEntity, {}>