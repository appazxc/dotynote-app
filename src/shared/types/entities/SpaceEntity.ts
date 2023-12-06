import { BaseEntity } from './BaseEntity';

export type SpaceEntity = BaseEntity<{
  name: string,
  isDefault: boolean,
  mainNoteId: string | null,
  activeTabId: string | null,
  spaceTabs: string[],
}>
