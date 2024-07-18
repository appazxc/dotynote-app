import { BaseEntity } from './BaseEntity';

export type UserEntity = BaseEntity<{
  username: string | null,
  nickname: string | null,
  email?: string,
}>
