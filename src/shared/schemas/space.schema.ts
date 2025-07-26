import { schema } from 'normalizr';

import { noteSchema } from './note.schema';
import { spaceTabSchema } from './spaceTab.schema';

export const spaceSchema = new schema.Entity(
  'space', 
  {
    mainNote: noteSchema,
    tabs: [spaceTabSchema],
  });