import { schema } from 'normalizr';

import { noteSchema } from './note.schema';
import { userSchema } from './user.schema';

export const postSchema = new schema.Entity(
  'post', 
  {
    parent: noteSchema,
    note: noteSchema,
    author: userSchema,
  });