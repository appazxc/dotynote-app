import { BaseEntity } from './BaseEntity';

export type ApiSpaceTabEntity = BaseEntity<{
  spaceId: string;
  pos: number;
  isPinned: boolean;
  routes: string[];
}>

export type SpaceTabEntity = ApiSpaceTabEntity;