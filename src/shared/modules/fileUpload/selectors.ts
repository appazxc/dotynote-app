import { createSelector } from '@reduxjs/toolkit';

import { buildFileTag, FilesType, TagType } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { AppState } from 'shared/types/store';

type SelectFilteredFilesByTagParams = {
  files: FilesType,
  tag: TagType,
}

export const selectFilteredFilesByTag = createSelector([
  (state: AppState) => state.upload.byId,
  (_, { files }: SelectFilteredFilesByTagParams) => files,
  (_, { tag }: SelectFilteredFilesByTagParams) => tag,
], (filesById, files, tag) => {
  return files.filter((file) => buildFileTag({
    zone: filesById[file.fileId].zone,
    zoneId: filesById[file.fileId].zoneId,
    type: filesById[file.fileId].type,
  }) === tag).map(file => ({
    ...filesById[file.fileId],
    ...file,
  }));
});

export const selectUploadFileEntity = (state: AppState, id: string): UploadFileEntity | null => 
  state.upload.byId[id] || null;