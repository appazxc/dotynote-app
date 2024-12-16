import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ZoneType, UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';

type StatusType = 'idle' | 'pending' | 'complete' | 'canceled' | 'error';

export type UploadFileEntity = { 
  fileId: string,
  type: UploadFileType,
  zone: ZoneType,
  zoneId: number,
  status: StatusType,
  progress: number,
  error: string | null,
}

type AddFilePayload = {
  fileId: string,
  type: UploadFileType,
  zone: ZoneType,
  zoneId: number,
}

type UpdateFilePayload = { fileId: UploadFileEntity['fileId'] } & Partial<UploadFileEntity>

type InitialState = {
  byId: {
    [x: string]: UploadFileEntity
  }
}

const initialState: InitialState = {
  byId: {},
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addFile: (state, { payload: { fileId, type, zone, zoneId } }: PayloadAction<AddFilePayload>) => {
      state.byId[fileId] = {
        fileId,
        type,
        zone, 
        zoneId,
        status: 'idle',
        progress: 0,
        error: null,
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