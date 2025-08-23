import { MergeEntity } from 'shared/types/entities/MergeEntity';

import { BaseEntity } from './BaseEntity';

export type ApiUserStorageEntity = BaseEntity<{
  updatedAt: string;
  userId: string;
  fileSize: number;
  fileCount: number;
  imageCount: number;
  videoSize: number;
  videoCount: number;
  audioSize: number;
  audioCount: number;
  recordSize: number;
  recordCount: number;
  excalidrawSize: number;
  excalidrawCount: number;
  noteCount: number;
  totalSize: number;
}>

export type UserStorageEntity = MergeEntity<ApiUserStorageEntity, {}>