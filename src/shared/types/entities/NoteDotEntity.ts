import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteDotEntity = BaseEntity<{
  text: string | null;
  total: number;
  my: number;
  noteId: string;
}>

export type NoteDotEntity = MergeEntity<ApiNoteDotEntity, {}>;