import { schema } from 'normalizr';

import { noteSchema } from 'shared/schemas/note.schema';

const postSchema = new schema.Entity('post', {
  note: noteSchema,
});

export const postNestedSchema = new schema.Entity('postNested', {
  post: postSchema,
});