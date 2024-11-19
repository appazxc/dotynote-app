import { schema } from 'normalizr';

import { noteSchema } from 'shared/schemas/note.schema';
import { postDotSchema } from 'shared/schemas/postDot.schema';
import { postInternalSchema } from 'shared/schemas/postInternal.schema';
import { userSchema } from 'shared/schemas/user.schema';

export const postSchema = new schema.Entity(
  'post', 
  {
    parent: noteSchema,
    note: noteSchema,
    author: userSchema,
    internal: postInternalSchema,
    dots: [postDotSchema],
  });