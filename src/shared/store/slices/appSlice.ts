import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { appSessionSelector, spaceSelector, spaceTabSelector } from 'shared/selectors';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { INVALID_ID } from 'shared/constants/errors';
import { getTabMatch } from 'desktop/modules/app/helpers/tabHelpers';
import { tabNames } from 'desktop/modules/app/constants/tabNames';

import { AppState, AppThunk } from '..';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from './entitiesSlice';
import { Loader, loaderIds } from 'shared/constants/loaderIds';
import { withAppLoader } from 'shared/modules/loaders/actions/withAppLoaders';

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

type CreateSpaceTab = { 
  fromTabId?: string, 
  path?: string, 
  spaceId: string, 
  navigate?: boolean 
};
export const createSpaceTab: AppThunk<CreateSpaceTab> = ({ spaceId, path, navigate }) =>
  withAppLoader(loaderIds.createSpaceTab, async (dispatch, getState) => {
    try {
      const newTabId = await api.createSpaceTab(spaceId, { path });
      
      const tabs = selectActiveSpaceTabs(getState());
      const newTabs = [...tabs, newTabId];
      
      dispatch(updateSpaceTabs({id: spaceId, tabs: newTabs }));

      if (navigate) {
        dispatch(updateActiveSpaceTab(newTabId));
      }
      // eslint-disable-next-line no-empty
    } catch (err) {}
  });

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
      .map((spaceTab) => {
        const { routes } = spaceTab!;
        return getTabMatch(routes[0]);
      })
      .filter(match => match && match.route.name === tabNames.note)
      .map(match => {

        return match!.pathMatch.params.noteId;
      });

    await api.loadNotes({ ids: noteIds });

    return [];
  };

export const updateActiveSpaceTab = (tabId) => (dispatch, getState) => {
  const appSession = selectAppSession(getState());

  if (!appSession) return;

  dispatch(updateEntity({ id: appSession.id, type: entityNames.appSession, data: {
    activeSpaceTabId: tabId
  } }));
};

type InitialState = {
  isOpen: boolean,
  appSession?: string,
  isPageLoading: boolean,
  spaceTabs: {
    [id: string]: string[],
  },
  loaders: Loader[],
}

const initialState: InitialState = {
  isOpen: false,
  isPageLoading: false,
  spaceTabs: {},
  loaders: [],
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
    updateSpaceTabs: (state, { payload }: PayloadAction<{ id: string, tabs: string[] }>) => {
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
  stopPageLoading,
  updateSpaceTabs,
} = appSlice.actions;

export default appSlice.reducer;
