import { BaseEntity, IdentityType } from './BaseEntity';

export type SpaceTabEntity = BaseEntity<{
  spaceId: IdentityType,
  pos: number,
  isPinned: boolean,
  routes: string[],
}>
