import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserEntity = BaseEntity<{
  username: string,
  nickname: string | null,
  email?: string,
  settings?: string,
}>

export type UserEntity = MergeEntity<ApiUserEntity, {
  settings?: UserSettingsEntity,
}>