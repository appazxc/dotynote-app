import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';

import { AppThunk } from '..';

export const fetchAppSession: AppThunk = () => async (dispatch, getState) => {
  const sessionId = await api.getAppSession();
  dispatch(setAppSession(sessionId));
};

type InitialState = {
  isOpen: boolean,
  appSession?: string
}

const initialState: InitialState = {
  isOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    setAppSession: (state, { payload }: PayloadAction<string>) => {
      state.appSession = payload;
    },
  },
});

export const { open, close, setAppSession } = appSlice.actions;

export default appSlice.reducer;
