import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { INVALID_ID } from 'shared/constants/errors';
import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { tabNames } from 'shared/modules/space/constants/tabNames';

import { AppState, AppThunk, ThunkAction } from '..';
import { loaderIds } from 'shared/constants/loaderIds';
import { withAppLoader } from 'shared/modules/loaders/actions/withAppLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { entityApi } from 'shared/api/entityApi';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { getNextActiveTabId } from 'shared/helpers/space/spaceTabsHelpers';

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
  navigate?: boolean,
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
          const newTabId = await entityApi.spaceTab.create({ 
            routes: [path || buildTabUrl({ routeName: tabNames.home })], 
            spaceId 
          });
          
          const tabs = selectActiveSpaceTabs(getState());
          const newTabs = [...tabs, newTabId];
          
          entityApi.space.update(spaceId, { 
            spaceTabs: newTabs,
            ...navigate ? {
              activeTabId: newTabId,
            } : null,
          });
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

    await entityApi.space.update(space.id, {
      spaceTabs: space.spaceTabs.filter(id => id !== tabId),
      ...space.activeTabId === tabId ? { activeTabId: getNextActiveTabId(space.spaceTabs, tabId) } : null,
    });
  };



export const changeActiveTab = (id: string) => async (dispatch, getState) => {
  const activeSpaceId = selectActiveSpaceId(getState());

  if (!activeSpaceId) {
    return;
  }

  await entityApi.space.update(activeSpaceId, { activeTabId: id });
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

type InitialState = {
  isOpen: boolean,
  isSideOpen: boolean,
  isPageLoading: boolean,
  activeSpaceId: string | null,
  // when user enter some link we redirect him to app and open tab with this route
  waitedRoute: string | null,
}

const initialState: InitialState = {
  isOpen: false,
  isSideOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
  waitedRoute: null,
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
    updateActiveSpaceId: (state, { payload }: PayloadAction<string>) => {
      state.activeSpaceId = payload;
    },
    addWaitedRoute: (state, { payload }: PayloadAction<string>) => {
      state.waitedRoute = payload;
    },
    cleanWaitedRoute: (state) => {
      state.waitedRoute = null;
    },
    toggleSide: (state) => {
      state.isSideOpen = !state.isSideOpen;
    }
  },
});

export const selectActiveSpace = (state: AppState) => {
  return spaceSelector.getById(state, state.app.activeSpaceId);
};

export const selectSpaceTabs = (state: AppState, id?: string | null) => {
  return id ? state.entities.space[id]?.spaceTabs || EMPTY_ARRAY : EMPTY_ARRAY;
};

export const selectActiveSpaceTabs = (state: AppState) => {
  return selectSpaceTabs(state, selectActiveSpaceId(state));
};

export const selectActiveSpaceActiveTab = (state: AppState) => {
  return spaceTabSelector.getById(state, selectActiveSpace(state)?.activeTabId);
};

export const selectActiveSpaceId = (state: AppState) => {
  return state.app.activeSpaceId;
};

export const { 
  open,
  close,
  startPageLoading,
  stopPageLoading,
  updateActiveSpaceId,
  toggleSide,
  addWaitedRoute,
  cleanWaitedRoute,
} = appSlice.actions;

export default appSlice.reducer;
