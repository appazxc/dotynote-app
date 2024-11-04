import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiPostInternalEntity = BaseEntity<{
  max: number
}>

export type PostInternalEntity = MergeEntity<ApiPostInternalEntity, {}>;