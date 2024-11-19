import { schema } from 'normalizr';

import { userSchema } from 'shared/schemas/user.schema';

export const noteDotSchema = new schema.Entity(
  'noteDot', 
  {
    author: userSchema,
  });