import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiPostDotEntity = BaseEntity<{
  text: string | null;
  total: number;
  my: number;
  postId: string;
}>

export type PostDotEntity = MergeEntity<ApiPostDotEntity, {}>;