import { schema } from 'normalizr';

import { noteSettingsSchema } from 'shared/schemas/noteSettings.schema';
import { postsSettingsSchema } from 'shared/schemas/postsSettings.schema';
import { userSchema } from 'shared/schemas/user.schema';

export const noteSchema = new schema.Entity(
  'note', 
  {
    author: userSchema,
    postsSettings: postsSettingsSchema,
    settings: noteSettingsSchema,
  });