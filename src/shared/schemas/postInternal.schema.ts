import { schema } from 'normalizr';

import { noteSchema } from 'shared/schemas/note.schema';

const postSchema = new schema.Entity('post', {
  note: noteSchema,
});

export const postInternalSchema = new schema.Entity('postInternal', {
  post: postSchema,
});