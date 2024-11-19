import { schema } from 'normalizr';

import { userSchema } from 'shared/schemas/user.schema';

export const postDotSchema = new schema.Entity(
  'postDot', 
  {
    author: userSchema,
  });