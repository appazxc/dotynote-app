import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { appSessionSelector, spaceSelector, spaceTabSelector } from 'shared/selectors';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { INVALID_ID } from 'shared/constants/errors';
import { getRouteMatch } from 'desktop/modules/app/helpers/getRouteMatch';
import { appRouteNames } from 'desktop/modules/app/constants/appRouteNames';

import { AppState, AppThunk } from '..';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from './entitiesSlice';

export const fetchAppSession: AppThunk = () => async (dispatch, getState) => {
  const sessionId = await api.loadAppSession();
  dispatch(setAppSession(sessionId));
};

export const fetchUserSpace: AppThunk<string | void> = (id) => 
  async (dispatch, getState) => {
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

export const updateTab: AppThunk<{ id: string, data: Partial<SpaceTabEntity>}> = ({ id, data }) => 
  async (dispatch, getState) => {
    // await api.updateTab(id, data);

    dispatch(updateEntity({ type: entityNames.spaceTab, id, data }));

  };

export const fetchSpaceTabsRouteNotes: AppThunk<string> = (spaceId) => 
  async (dispatch, getState) => {
    const state = getState();
    const noteIds = selectSpaceTabs(state, spaceId)
      .map(id => spaceTabSelector.getById(state, id))
      .filter((spaceTab) => spaceTab && spaceTab.routes.length)
      .map(({ routes }) => {
        return getRouteMatch(routes[0]);
      })
      .filter(match => match && match.route.name === appRouteNames.note)
      .map(match => match.pathMatch.params.noteId);

    await api.loadNotes({ ids: noteIds });

    return [];
  };

type InitialState = {
  isOpen: boolean,
  appSession?: string,
  isPageLoading: boolean,
  spaceTabs: {
    [id: string]: string[],
  }
}

const initialState: InitialState = {
  isOpen: false,
  isPageLoading: false,
  spaceTabs: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startPageLoading: (state) => {
      state.isPageLoading = true;
    },
    stopPageLoading: (state) => {
      state.isPageLoading = false;
    },
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

export const selectActiveSpaceActiveTab = (state: AppState) => {
  const appSession = selectAppSession(state);

  return spaceTabSelector.getById(state, appSession?.activeSpaceTabId);
};

export const { 
  open,
  close,
  setAppSession,
  setSpaceTabs,
  startPageLoading,
  stopPageLoading 
} = appSlice.actions;

export default appSlice.reducer;
