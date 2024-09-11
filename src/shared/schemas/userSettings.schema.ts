import { schema } from 'normalizr';

export const noteSchema = new schema.Entity('note');

export const userSettingsSchema = new schema.Entity('userSettings', {
  hub: noteSchema,
});