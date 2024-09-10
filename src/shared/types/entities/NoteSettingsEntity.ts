import { BaseEntity } from './BaseEntity';

export type ApiNoteSettingsEntity = BaseEntity<{
  display: boolean,
}>

export type NoteSettingsEntity = ApiNoteSettingsEntity