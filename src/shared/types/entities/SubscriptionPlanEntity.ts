import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type BillingPeriod = 'yearly' | 'monthly' | 'perpetual';

export type ApiSubscriptionPlanEntity = BaseEntity<{
  code: string;
  name: string;
  description: string;
  price: number;
  interval: BillingPeriod;
  credits: number;
  doty: number;
  stripeProductId: string | null;
}>

export type SubscriptionPlanEntity = MergeEntity<ApiSubscriptionPlanEntity, {}>;