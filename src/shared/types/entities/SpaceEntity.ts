import { BaseEntity, IdentityType } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  userId: IdentityType,
  mainNoteId: IdentityType | null,
}>
