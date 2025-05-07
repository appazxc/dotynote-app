import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { OrderByEntity } from 'shared/types/entities/OrderByEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostsSettingsEntity = BaseEntity<{
  internal: boolean;
  orderById: number;
  sort: 'asc' | 'desc';
  noteId: string;
  // stickType: 'simple' | 'multi' | 'auto' | 'gpt',
  // stickFrom: string[],
}>

export type PostsSettingsEntity = MergeEntity<ApiPostsSettingsEntity, {
  orderBy?: OrderByEntity;
}>