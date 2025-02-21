import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserSettingsEntity = BaseEntity<{
  hubId?: number | null;
  hub?: number | null;
}>

export type UserSettingsEntity = MergeEntity<ApiUserSettingsEntity, {
  hubId?: number | null;
  hub?: NoteEntity | null;
}>