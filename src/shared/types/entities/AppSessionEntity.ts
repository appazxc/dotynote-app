import { BaseEntity } from './BaseEntity';

export type AppSessionEntity = BaseEntity<{
  userId: string,
  activeSpaceId: string,
  activeSpaceTabId: string | null,
}>
