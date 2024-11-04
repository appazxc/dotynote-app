import { schema } from 'normalizr';

import { noteSchema } from './note.schema';
import { userSchema } from './user.schema';

export const postInternalSchema = new schema.Entity(
  'postInternal', 
  {
    parent: noteSchema,
    note: noteSchema,
    author: userSchema,
  });