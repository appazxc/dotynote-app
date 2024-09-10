import { schema } from 'normalizr';

import { noteSchema } from './note.schema';
import { spaceTabSchema } from './spaceTab.schema';
import { userSchema } from './user.schema';

export const spaceSchema = new schema.Entity(
  'space', 
  {
    user: userSchema,
    mainNote: noteSchema,
    tabs: [spaceTabSchema],
  });