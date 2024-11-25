import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

export type ApiPostDotEntity = BaseEntity<{
  text: string | null,
  author: string,
  total: number,
  my: number,
  postId: number,
}>

export type PostDotEntity = MergeEntity<ApiPostDotEntity, {
  author: UserEntity
}>;