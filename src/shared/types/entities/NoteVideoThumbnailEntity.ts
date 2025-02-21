import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteVideoThumbnailEntity = BaseEntity<{
  size: number;      
  width: number;
  height: number;
  url: string;  
  blurhash: string;
}>

export type NoteVideoThumbnailEntity = MergeEntity<ApiNoteVideoThumbnailEntity, {}>;