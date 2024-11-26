import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteDotEntity = BaseEntity<{
  text: string | null,
  total: number,
  my: number,
  noteId: number,
}>

export type NoteDotEntity = MergeEntity<ApiNoteDotEntity, {}>;