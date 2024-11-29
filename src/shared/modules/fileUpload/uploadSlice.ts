import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ZoneType, UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';

export type UploadFileEntity = { 
  fileId: string,
  type: UploadFileType,
  zone: ZoneType,
  zoneId: number,
  status: 'idle' | 'pending' | 'complete' | 'canceled',
  progress: number,
}

type AddFilePayload = {
  fileId: string,
  type: UploadFileType,
  zone: ZoneType,
  zoneId: number,
}

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
      };
    },
  },
});

export const { addFile } = uploadSlice.actions;

export default uploadSlice.reducer;