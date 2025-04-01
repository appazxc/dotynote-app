import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { SubscriptionPlanEntity } from 'shared/types/entities/SubscriptionPlanEntity';

export type ApiSubscriptionEntity = BaseEntity<{
  startDate: string;
  endDate: string;
  status: string;
  stripeStatus: string;
  canceledAt: string;
  nextLimitUpdateAt: string | null;
  planId: string;
}>

export type SubscriptionEntity = MergeEntity<ApiSubscriptionEntity, {
  plan?: SubscriptionPlanEntity
}>;