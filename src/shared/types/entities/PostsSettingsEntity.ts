import { PostOrderBy } from 'shared/types/common';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteFiltersEntity } from 'shared/types/entities/NoteFiltersEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostsSettingsEntity = BaseEntity<{
  nested: boolean;
  orderBy: PostOrderBy;
  sort: 'asc' | 'desc';
  noteId: string;
  listType: 'all' | 'stick',
  // "all" list type filters
  filtersId?: string;
}>

export type PostsSettingsEntity = MergeEntity<ApiPostsSettingsEntity, {
  filters?: NoteFiltersEntity;
}>