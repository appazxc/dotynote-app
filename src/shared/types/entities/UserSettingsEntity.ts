import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserSettingsEntity = BaseEntity<{
  hubId?: number | null;
  hub?: number | null;
  deleteEmptyNotes: boolean;
}>

export type UserSettingsEntity = MergeEntity<ApiUserSettingsEntity, {
  hub?: NoteEntity | null;
}>