import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

export type ApiNoteDotEntity = BaseEntity<{
  text: string | null,
  author: string,
  total: number,
  my: number,
}>

export type NoteDotEntity = MergeEntity<ApiNoteDotEntity, {
  author: UserEntity
}>;