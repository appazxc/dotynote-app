import { BaseEntity } from './BaseEntity';

export type PostsSettingsEntity = BaseEntity<{
  display: boolean,
  comments: boolean,
  stickType: 'simple' | 'multi' | 'auto' | 'gpt',
  stickFrom: string[],
}>
