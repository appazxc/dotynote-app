import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserSettingsEntity = BaseEntity<{
  autoStickNote?: number,
}>

export type UserSettingsEntity = MergeEntity<ApiUserSettingsEntity, {
  autoStickNote?: NoteEntity,
}>