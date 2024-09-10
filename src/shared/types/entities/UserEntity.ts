import { UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

import { BaseEntity } from './BaseEntity';

export type UserEntity = BaseEntity<{
  username: string,
  nickname: string | null,
  email?: string,
  settings?: UserSettingsEntity,
}>
