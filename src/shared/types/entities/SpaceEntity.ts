import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { BaseEntity } from './BaseEntity';

export type ApiSpaceEntity = BaseEntity<{
  name: string,
  userId: string,
  mainNoteId: number | null,
  tabs: string[],
}>

export type SpaceEntity = MergeEntity<ApiSpaceEntity, {
  tabs: SpaceTabEntity[],
}>