import { schema } from 'normalizr';

import { noteVideoThumbnailSchema } from 'shared/schemas/noteVideoThumbnail.schema';

export const noteVideoSchema = new schema.Entity('noteVideo', {
  thumbnail: noteVideoThumbnailSchema,
});