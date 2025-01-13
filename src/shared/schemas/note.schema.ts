import { schema } from 'normalizr';

import { noteDotSchema } from 'shared/schemas/noteDot.schema';
import { noteFileSchema } from 'shared/schemas/noteFile.schema';
import { noteImageSchema } from 'shared/schemas/noteImage.schema';
import { noteSettingsSchema } from 'shared/schemas/noteSettings.schema';
import { postsSettingsSchema } from 'shared/schemas/postsSettings.schema';
import { userSchema } from 'shared/schemas/user.schema';

export const noteSchema = new schema.Entity(
  'note', 
  {
    author: userSchema,
    postsSettings: postsSettingsSchema,
    settings: noteSettingsSchema,
    dots: [noteDotSchema],
    images: [noteImageSchema],
    files: [noteFileSchema],
  });