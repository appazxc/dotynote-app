import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserBalanceEntity = BaseEntity<{
  credits: number;
  doty: number;
}>

export type UserBalanceEntity = MergeEntity<ApiUserBalanceEntity, {}>