import { schema } from 'normalizr';

const noteSchema = new schema.Entity('note');

export const userSettingsSchema = new schema.Entity('userSettings', {
  hub: noteSchema,
});