import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserSettingsEntity = BaseEntity<{
  deleteEmptyNotes: boolean;
  autoPlayNextAudio: boolean;
}>

export type UserSettingsEntity = MergeEntity<ApiUserSettingsEntity, {}>