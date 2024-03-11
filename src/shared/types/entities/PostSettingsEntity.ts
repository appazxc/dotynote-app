import { BaseEntity } from './BaseEntity';

export type PostSettingsEntity = BaseEntity<{
  display: boolean,
  comments: boolean,
  stickType: 'simple' | 'multi' | 'auto' | 'gpt',
  stickFrom: string[],
}>
