import { schema } from 'normalizr';

import { orderBySchema } from 'shared/schemas/orderBy.schema';

export const postsSettingsSchema = new schema.Entity('postsSettings', {
  orderBy: orderBySchema,
});