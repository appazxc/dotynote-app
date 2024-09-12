import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiNoteSettingsEntity = BaseEntity<{
  display: boolean,
}>

export type NoteSettingsEntity = MergeEntity<ApiNoteSettingsEntity, {}>