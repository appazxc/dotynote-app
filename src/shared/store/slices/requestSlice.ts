import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InternalAxiosRequestConfig } from 'axios';

type Req = Pick<InternalAxiosRequestConfig<any>, 'data' | 'url'>

type InitialState = {
  requestIds: string[],
  byId: {
    [x: string]: Req
  }
}

const initialState: InitialState = {
  requestIds: [],
  byId: {},
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    startRequest: (state, { payload: { id, request } }: PayloadAction<{
      id: string,
      request: Req
    }>) => {
      state.byId[id] = request;
      state.requestIds.push(id);
    },
    finishRequest: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      delete state.byId[id];
      state.requestIds = state.requestIds.filter((requestId) => requestId !== id);
    },
  },
});

export const { startRequest, finishRequest } = requestSlice.actions;

export default requestSlice.reducer;