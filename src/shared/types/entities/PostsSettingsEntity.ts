import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type PostOrderBy = 'position' | 'createdAt' | 'updatedAt';

export type ApiPostsSettingsEntity = BaseEntity<{
  internal: boolean;
  orderBy: PostOrderBy;
  sort: 'asc' | 'desc';
  noteId: string;
  listType: 'all' | 'stick',
}>

export type PostsSettingsEntity = MergeEntity<ApiPostsSettingsEntity, {}>