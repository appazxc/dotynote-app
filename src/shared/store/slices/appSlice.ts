import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { appSessionSelector } from 'shared/selectors';

import { AppState, AppThunk } from '..';

export const fetchAppSession: AppThunk = () => async (dispatch, getState) => {
  const sessionId = await api.getAppSession();
  dispatch(setAppSession(sessionId));
};
export const fetchUserSpace: AppThunk<string> = (id) => async (dispatch, getState) => {
  await api.getUserSpace(id);
};
export const fetchSpaceTabs: AppThunk<string | null> = (id) => async (dispatch, getState) => {
  if (!id) {
    return;
  }

  const spaceTabs = await api.getSpaceTabs(id);
  dispatch(setSpaceTabs({ id, tabs: spaceTabs }));
};

type InitialState = {
  isOpen: boolean,
  appSession?: string,
  spaceTabs: {
    [id: string]: string[],
  }
}

const initialState: InitialState = {
  isOpen: false,
  spaceTabs: {},
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
    setSpaceTabs: (state, { payload }: PayloadAction<{ id: string, tabs: string[] }>) => {
      const { id, tabs } = payload;
      state.spaceTabs[id] = tabs;
    },
  },
});

export const { open, close, setAppSession, setSpaceTabs } = appSlice.actions;

export const selectAppSession = (state: AppState) => {
  return appSessionSelector.getById(state, state.app.appSession);
};

export default appSlice.reducer;
