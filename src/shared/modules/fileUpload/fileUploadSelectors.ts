import { createSelector } from '@reduxjs/toolkit';

import { buildFileTag, TagType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { AppState } from 'shared/types/store';

type Params = {
  files: UploadFile[],
  tag: TagType,
  status?: UploadFileEntity['status']
}

export type UploadEntity = UploadFile & UploadFileEntity;

type SelectUploadEntities = (state: AppState, params: Params) => 
  UploadEntity[]

export const selectUploadEntities: SelectUploadEntities = createSelector([
  (state: AppState) => state.upload.byId,
  (_, { files }: Params) => files,
  (_, { tag }: Params) => tag,
  (_, { status }: Params) => status,
], (filesById, files, tag, status) => {
  return files
    .filter((file) => {
      const tagParams = {
        zone: filesById[file.fileId].zone,
        zoneId: filesById[file.fileId].zoneId,
        type: filesById[file.fileId].type,
      };
      
      const isRightStatus = status ? filesById[file.fileId].status === status : true;

      return buildFileTag(tagParams) === tag && isRightStatus;
    })
    .map(file => ({
      ...filesById[file.fileId],
      ...file,
    }));
});

export const selectUploadFiles: SelectUploadEntities = createSelector([
  (state: AppState) => state.upload.byId,
  (_, { files }: Params) => files,
  (_, { tag }: Params) => tag,
  (_, { status }: Params) => status,
], (filesById, files, tag, status) => {
  return files
    .filter((file) => {
      const tagParams = {
        zone: filesById[file.fileId].zone,
        zoneId: filesById[file.fileId].zoneId,
        type: filesById[file.fileId].type,
      };
      
      const isRightStatus = status ? filesById[file.fileId].status === status : true;

      return buildFileTag(tagParams) === tag && isRightStatus;
    })
    .map(file => ({
      ...filesById[file.fileId],
      ...file,
    }));
});

export const selectUploadFileEntity = (state: AppState, id: string): UploadFileEntity | null => 
  state.upload.byId[id] || null;