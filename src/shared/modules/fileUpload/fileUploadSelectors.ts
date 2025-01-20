import { createSelector } from '@reduxjs/toolkit';

import { UploadFile, UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { AppState } from 'shared/types/store';

type Params = {
  files: UploadFile[],
  noteId?: number,
  type?: UploadFileType,
  status?: UploadFileEntity['status'],
}

export type UploadEntity = UploadFile & UploadFileEntity;

type SelectUploadEntities = (state: AppState, params: Params) => 
  UploadEntity[]

export const selectUploadFiles: (state: AppState, params: Params) => UploadFile[] = createSelector([
  (state: AppState) => state.upload.byId,
  (_, { files }: Params) => files,
  (_, { noteId }: Params) => noteId,
  (_, { type }: Params) => type,
  (_, { status }: Params) => status,
], (filesById, files, noteId, type, status) => {
  return files
    .filter((file) => {
      const isRightNote = noteId ? filesById[file.fileId].noteId === noteId : true;
      const isRightType = type ? filesById[file.fileId].type === type : true;
      const isRightStatus = status ? filesById[file.fileId].status === status : true;

      return isRightNote && isRightType && isRightStatus;
    });
});

export const selectUploadEntities: SelectUploadEntities = createSelector([
  (state: AppState) => state.upload.byId,
  selectUploadFiles,
], (filesById, files) => {
  return files.map(file => ({
    ...filesById[file.fileId],
    ...file,
  }));
});

export const selectUploadFileEntity = (state: AppState, id: string): UploadFileEntity | null => 
  state.upload.byId[id] || null;