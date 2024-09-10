import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { BaseEntity } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  userId: string,
  mainNoteId: number | null,
  tabs: SpaceTabEntity[],
}>
