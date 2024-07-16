import { BaseEntity } from './BaseEntity';

export type SpaceTabEntity = BaseEntity<{
  spaceId: string,
  pos: number,
  isPinned: boolean,
  routes: string[],
}>
