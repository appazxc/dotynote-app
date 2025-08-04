import { schema } from 'normalizr';

import { noteSchema } from 'shared/schemas/note.schema';
import { postDotSchema } from 'shared/schemas/postDot.schema';
import { postNestedSchema } from 'shared/schemas/postNested.schema';
import { userSchema } from 'shared/schemas/user.schema';

export const postSchema = new schema.Entity(
  'post', 
  {
    note: noteSchema,
    owner: userSchema,
    nested: postNestedSchema,
    dots: [postDotSchema],
  });