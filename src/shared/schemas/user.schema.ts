import { schema } from 'normalizr';

import { userSettingsSchema } from 'shared/schemas/userSettings.schema';

export const userSchema = new schema.Entity('user', {
  settings: userSettingsSchema,
});