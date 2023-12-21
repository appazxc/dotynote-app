import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { Device, devices } from 'shared/constants/devices';
import { spaceSelector } from 'shared/selectors/entities';
import { invariant } from 'shared/util/invariant';

import { AppState } from '..';

type InitialState = {
  isOpen: boolean,
  isSideOpen: boolean,
  isPageLoading: boolean,
  activeSpaceId: string | null,
  activeTabId: string | null,
  // when user enter some link we redirect him to app and open tab with this route
  waitedRoute: string | null,
  device: Device | null,
}

const initialState: InitialState = {
  isOpen: false,
  isSideOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
  activeTabId: null,
  waitedRoute: null,
  device: null,
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
    updateActiveTabId: (state, { payload }: PayloadAction<string | null>) => {
      state.activeTabId = payload;
    },
    updateDevice: (state, { payload }: PayloadAction<Device>) => {
      state.device = payload;
    },
    addWaitedRoute: (state, { payload }: PayloadAction<string>) => {
      state.waitedRoute = payload;
    },
    cleanWaitedRoute: (state) => {
      state.waitedRoute = null;
    },
    toggleSide: (state) => {
      state.isSideOpen = !state.isSideOpen;
    },
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

export const selectSortedSpaceTabs = createSelector(
  [
    selectActiveSpaceTabs,
    (state: AppState) => state.entities.spaceTab,
  ], 
  (tabs, spaceTabEntities) => {
    return tabs.slice().sort((tabA, tabB) => (spaceTabEntities[tabA]?.pos || 0) - (spaceTabEntities[tabB]?.pos || 0));
  });
  
export const selectActiveSpaceId = (state: AppState) => {
  return state.app.activeSpaceId;
};
  
export const selectActiveTabId = (state: AppState) => {
  return state.app.activeTabId;
};

export const selectIsMobile = (state: AppState) => {
  invariant(state.app.device, 'Try use device before it was initialized');
    
  return state.app.device === devices.MOBILE;
};

export const selectActiveTab = createSelector(
  [
    (state: AppState) => state.entities.spaceTab,
    selectActiveSpaceTabs,
    selectActiveTabId,
  ],
  (spaceTabEntities, activeSpaceTabs, activeTabId) => {
    if (!activeTabId) {
      return null;
    }

    if (activeSpaceTabs.includes(activeTabId)) {
      return spaceTabEntities[activeTabId] || null;
    }

    return null;
  }
);

export const { 
  open,
  close,
  startPageLoading,
  stopPageLoading,
  toggleSide,
  addWaitedRoute,
  cleanWaitedRoute,
  updateActiveSpaceId,
  updateActiveTabId,
  updateDevice,
} = appSlice.actions;

export default appSlice.reducer;
