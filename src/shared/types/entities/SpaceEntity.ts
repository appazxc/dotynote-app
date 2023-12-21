import { BaseEntity } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  isDefault: boolean,
  mainNoteId: string | null,
  spaceTabs: string[],
}>
