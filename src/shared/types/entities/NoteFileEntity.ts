import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteFileEntity = BaseEntity<{
  filename: string;
  size: number;   
  pos: number;
  deletedAt: string | null;      
}>

export type NoteFileEntity = MergeEntity<ApiNoteFileEntity, {}>;