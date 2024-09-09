import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { BaseEntity } from './BaseEntity';

export type UserSettingsEntity = BaseEntity<{
  autoStickNoteId?: number,
  autoStickNote?: NoteEntity,
}>
