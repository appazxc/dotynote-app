import { BaseEntity } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  isDefault: boolean,
  sideNoteId: string | null,
  spaceTabs: string[]
}>
