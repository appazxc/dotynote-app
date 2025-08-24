import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserEntity = BaseEntity<{
  username: string;
  nickname: string | null;
  region?: string;
  email?: string;
  isAdmin?: boolean;
  settings?: string;
  balanceId?: string;
  createdAt?: string;
  status?: 'deleting' | 'active' | 'banned' | 'migratingRegion';
}>

export type UserEntity = MergeEntity<ApiUserEntity, {
  settings?: UserSettingsEntity;
}>