import { BaseEntity, string } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  userId: string,
  mainNoteId: string | null,
  spaceTabs: string[],
}>
