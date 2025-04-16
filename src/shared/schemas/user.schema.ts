import { schema } from 'normalizr';

import { userBalanceSchema } from 'shared/schemas/userBalance.schema';
import { userSettingsSchema } from 'shared/schemas/userSettings.schema';

export const userSchema = new schema.Entity('user', {
  settings: userSettingsSchema,
  balance: userBalanceSchema,
});