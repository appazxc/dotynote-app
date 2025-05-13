import { NoteOrderBy, Sort } from 'shared/types/common';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiNoteFiltersEntity = BaseEntity<{
  sort: Sort;
  orderBy: NoteOrderBy;
  hasImage: boolean | null;
  hasVideo: boolean | null;
  hasAudio: boolean | null;
  hasFile: boolean | null;
  hasRecord: boolean | null;
}>

export type NoteFiltersEntity = MergeEntity<ApiNoteFiltersEntity, {}>