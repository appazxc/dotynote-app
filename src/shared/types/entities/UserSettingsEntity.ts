import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserSettingsEntity = BaseEntity<{
  hubId?: string | null;
  hub?: string | null;
  deleteEmptyNotes: boolean;
  autoPlayNextAudio: boolean;
}>

export type UserSettingsEntity = MergeEntity<ApiUserSettingsEntity, {
  hub?: NoteEntity | null;
}>