import { schema } from 'normalizr';

import { subscriptionPlanSchema } from './subscriptionPlan.schema';

export const subscriptionSchema = new schema.Entity('subscription', {
  plan: subscriptionPlanSchema,
});