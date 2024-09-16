import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiOrderByEntity = BaseEntity<{
  type: string,
}>

export type OrderByEntity = MergeEntity<ApiOrderByEntity, {}>