import { BaseEntity } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  userId: string,
  mainNoteId: string | null,
  tabs: string[],
}>
