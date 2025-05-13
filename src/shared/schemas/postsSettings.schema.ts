import { schema } from 'normalizr';

import { noteFiltersSchema } from 'shared/schemas/noteFilters.schema';

export const postsSettingsSchema = new schema.Entity('postsSettings', {
  filters: noteFiltersSchema,
});