import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { appSessionSelector, spaceSelector } from 'shared/selectors';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { INVALID_ID } from 'shared/constants/errors';

import { AppState, AppThunk } from '..';

export const fetchAppSession: AppThunk = () => async (dispatch, getState) => {
  const sessionId = await api.loadAppSession();
  dispatch(setAppSession(sessionId));
};

export const fetchUserSpace: AppThunk<string | void> = (id) => async (dispatch, getState) => {
  console.log('load', id);
  
  if (!id) {
    return Promise.reject(new Error(INVALID_ID));
  }

  return await api.loadUserSpace(id);
};

export const fetchSpaceTabs: AppThunk<string | void> = (id) => async (dispatch, getState) => {
  if (!id) {
    return Promise.reject(new Error(INVALID_ID));
  }

  const spaceTabs = await api.loadSpaceTabs(id);
  
  dispatch(setSpaceTabs({ id, tabs: spaceTabs }));

  return spaceTabs;
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

export const selectActiveSpace = (state: AppState) => {
  const appSession = selectAppSession(state);

  if (!appSession) {
    return null;
  }

  return spaceSelector.getById(state, appSession.activeSpaceId);
};

const selectSpaceTabs = (state: AppState, id?: string) => {
  return id ? state.app.spaceTabs[id] || EMPTY_ARRAY : EMPTY_ARRAY;
};

export const selectActiveSpaceTabs = (state: AppState) => {
  const appSession = selectAppSession(state);

  return selectSpaceTabs(state, appSession?.activeSpaceId);
};

export default appSlice.reducer;
