import { BaseEntity } from './BaseEntity';

export type SpaceTabEntity = BaseEntity<{
  userId: string,
  spaceId: string,
  pos: number,
  isPinned: boolean,
  routes: string[],
}>
