import { createSelector } from '@reduxjs/toolkit';

import { buildFileTag, TagType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { AppState } from 'shared/types/store';

type SelectFilteredFilesByTagParams = {
  files: UploadFile[],
  tag: TagType,
}

export type SelectFilteredFilesByTagReturn = (UploadFile & UploadFileEntity & {
  file: File,
})[]

type SelectFilteredFilesByTag = (state: AppState, params: SelectFilteredFilesByTagParams) => 
  SelectFilteredFilesByTagReturn

export const selectFilteredFilesByTag: SelectFilteredFilesByTag = createSelector([
  (state: AppState) => state.upload.byId,
  (_, { files }: SelectFilteredFilesByTagParams) => files,
  (_, { tag }: SelectFilteredFilesByTagParams) => tag,
], (filesById, files, tag) => {
  return files
    .filter((file) => {
      const tagParams = {
        zone: filesById[file.fileId].zone,
        zoneId: filesById[file.fileId].zoneId,
        type: filesById[file.fileId].type,
      };
      
      return buildFileTag(tagParams) === tag && filesById[file.fileId].status === 'idle';
    })
    .map(file => ({
      ...filesById[file.fileId],
      ...file,
    }));
});

export const selectUploadFileEntity = (state: AppState, id: string): UploadFileEntity | null => 
  state.upload.byId[id] || null;