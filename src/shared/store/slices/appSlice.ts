import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { appSessionSelector, spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { INVALID_ID } from 'shared/constants/errors';
import { getTabMatch } from 'desktop/modules/app/helpers/tabHelpers';
import { tabNames } from 'desktop/modules/app/constants/tabNames';

import { AppState, AppThunk, ThunkAction } from '..';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from './entitiesSlice';
import { Loader, loaderIds } from 'shared/constants/loaderIds';
import { withAppLoader } from 'shared/modules/loaders/actions/withAppLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { entityApi } from 'shared/api/entityApi';
import { getTabUrl } from 'desktop/modules/app/helpers/getTabUrl';

export const fetchAppSession = (): ThunkAction => async (dispatch, getState) => {
  const sessionId = await api.loadAppSession();
  dispatch(setAppSession(sessionId));
};

export const fetchUserSpace = (id?: string): ThunkAction<string> => 
  async (dispatch, getState) => {
    if (!id) {
      return Promise.reject(new Error(INVALID_ID));
    }

    return await api.loadSpace(id);
  };

type CreateSpaceTabParams = { 
  fromTabId?: string, 
  path?: string, 
  spaceId: string, 
  navigate?: boolean 
};

export const createSpaceTab = ({ spaceId, path, navigate }: CreateSpaceTabParams): ThunkAction => 
  async (dispatch, getState) => {
    const isLoading = selectIsLoaderInProgress(getState(), loaderIds.createSpaceTab);

    if (isLoading) {
      return;
    }

    dispatch(withLoader(loaderIds.createSpaceTab, withAppLoader(loaderIds.createSpaceTab, 
      async (dispatch, getState) => {
        try {
          const newTabId = await entityApi.spaceTab.create({ routes: [path || getTabUrl(tabNames.home)], spaceId });
          
          const tabs = selectActiveSpaceTabs(getState());
          const newTabs = [...tabs, newTabId];
          
          entityApi.space.updateEntity(spaceId, { spaceTabs: newTabs });
    
          if (navigate) {
            dispatch(updateActiveSpaceTab(newTabId));
          }
        // eslint-disable-next-line no-empty
        } catch (err) {}
      })
    ));
  };

export const closeTab: AppThunk<string> = (tabId) => 
  async (dispatch, getState) => {
    const spaceTab = spaceTabSelector.getById(getState(), tabId);
    const space = spaceSelector.getById(getState(), spaceTab?.spaceId);

    if (!space || !spaceTab) {
      return;
    }

    try {
      await entityApi.space.update(space.id, {
        spaceTabs: space.spaceTabs.filter(id => id !== spaceTab.id)
      });
    } catch(e) {

    }
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
  activeSpaceId: string | null,
}

const initialState: InitialState = {
  isOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
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
  return id ? state.entities.space[id]?.spaceTabs || EMPTY_ARRAY : EMPTY_ARRAY;
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
  startPageLoading,
  stopPageLoading,
} = appSlice.actions;

export default appSlice.reducer;
