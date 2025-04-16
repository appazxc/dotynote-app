import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserBalanceEntity = BaseEntity<{
  credits: number;
  usedCredits: number;
  reservedCredits: number;
  nextResetAt: string;
  lastResetAt: string;
}>

export type UserBalanceEntity = MergeEntity<ApiUserBalanceEntity, {}>