import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteAudioEntity = BaseEntity<{
  filename: string,
  size: number,   
  duration: number,   
  url: string,   
  deletedAt: string | null,      
}>

export type NoteAudioEntity = MergeEntity<ApiNoteAudioEntity, {}>;