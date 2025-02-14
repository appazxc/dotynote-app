import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteVideoEntity = BaseEntity<{
  filename: string,
  size: number,   
  duration: number,   
  pos: number,   
  deletedAt: string | null,      
}>

export type NoteVideoEntity = MergeEntity<ApiNoteVideoEntity, {}>;