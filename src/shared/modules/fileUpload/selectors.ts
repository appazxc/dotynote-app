import { createSelector } from '@reduxjs/toolkit';

import { buildFileTag, TagType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { AppState } from 'shared/types/store';

type SelectFilteredFilesByTagParams = {
  files: UploadFile[],
  tag: TagType,
  status?: UploadFileEntity['status']
}

export type MergedFilteredFile = UploadFile & UploadFileEntity;

export type SelectFilteredFilesByTagReturn = (MergedFilteredFile)[]

type SelectFilteredFilesByTag = (state: AppState, params: SelectFilteredFilesByTagParams) => 
  SelectFilteredFilesByTagReturn

export const selectFilteredFilesByTag: SelectFilteredFilesByTag = createSelector([
  (state: AppState) => state.upload.byId,
  (_, { files }: SelectFilteredFilesByTagParams) => files,
  (_, { tag }: SelectFilteredFilesByTagParams) => tag,
  (_, { status }: SelectFilteredFilesByTagParams) => status,
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