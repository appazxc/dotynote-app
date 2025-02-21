import { VideoMimeType } from '@vidstack/react';

import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteVideoThumbnailEntity } from 'shared/types/entities/NoteVideoThumbnailEntity';

export type ApiNoteVideoEntity = BaseEntity<{
  filename: string;
  size: number;   
  duration: number;   
  pos: number;   
  deletedAt: string | null;   
  width: number;
  height: number;
  mimeType: VideoMimeType;
  url?: string;  
  thumbnailId: string; 
}>

export type NoteVideoEntity = MergeEntity<ApiNoteVideoEntity, {
  thumbnail: NoteVideoThumbnailEntity;
}>;