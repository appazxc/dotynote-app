import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';

export type ApiNoteImageEntity = BaseEntity<{
  cfId: string;         
  filename: string;
  blurhash: string;          
  width: number;             
  height: number;            
  size: number;   
  variants: {
    small: string;
    medium: string;
    large: string;
  };
  _isLoaded?: boolean;           
}>

export type NoteImageEntity = MergeEntity<ApiNoteImageEntity, {}>;