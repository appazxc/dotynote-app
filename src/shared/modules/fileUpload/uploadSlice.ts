import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';

type StatusType = 'idle' | 'uploading' | 'processing' | 'complete' | 'canceled' | 'error';

export type UploadFileEntity = { 
  fileId: string;
  type: UploadFileType;
  noteId?: number;
  status: StatusType;
  progress: number;
  pos: number;
  tempId?: string;
  realId?: string | null;
  error: string | null;
  dimensions: { width: number; height: number };
}

type AddFilePayload = Pick<UploadFileEntity, 'fileId' | 'type' | 'noteId' | 'dimensions'>;

type UpdateFilePayload = { fileId: UploadFileEntity['fileId'] } & Partial<Omit<UploadFileEntity, 'type' | 'dimensions'>>

type InitialState = {
  byId: {
    [x: string]: UploadFileEntity;
  };
}

const initialState: InitialState = {
  byId: {},
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addFile: (
      state, 
      { payload: { fileId, type, noteId, dimensions } }: PayloadAction<AddFilePayload>) => {
      state.byId[fileId] = {
        fileId,
        type,
        dimensions,
        noteId,
        status: 'idle',
        progress: 0,
        error: null,
        pos: Infinity,
      };
    },
    updateFile: (
      state, 
      { payload: { fileId, ...rest } }: PayloadAction<UpdateFilePayload>
    ) => {
      state.byId[fileId] = {
        ...state.byId[fileId],
        ...rest,
      };

      if (rest.status === 'uploading') {
        state.byId[fileId].error = null;
        state.byId[fileId].progress = 0;
      }
    },
    deleteFiles: (
      state, 
      { payload: fileIds }: PayloadAction<string[]>
    ) => {
      fileIds.forEach((fileId) => {
        delete state.byId[fileId];
      });
    },
  },
});

export const { addFile, updateFile, deleteFiles } = uploadSlice.actions;

export default uploadSlice.reducer;