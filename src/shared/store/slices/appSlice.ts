import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { isBoolean } from 'lodash';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { Device, devices } from 'shared/constants/devices';
import { AddTo, RwMode, addTo, rwModes } from 'shared/modules/space/tabs/note/constants';
import { spaceSelector } from 'shared/selectors/entities';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { AppState } from 'shared/types/store';

type TempNote = {
  title: string,
  content?: any,
}

type InitialState = {
  isSideOpen: boolean,
  isPageLoading: boolean,
  activeSpaceId: string | null,
  activeTabId: string | null,
  // when user enter some link we redirect him to app and open tab with this route
  waitedRoute: string | null,
  device: Device | null,
  tempNote: TempNote | null,
  note: {
    rwMode: RwMode,
    isAdvancedEditActive: boolean,
    addTo: AddTo,
  },
};

const initialState: InitialState = {
  isSideOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
  activeTabId: null,
  waitedRoute: null,
  device: null,
  tempNote: null,
  note: {
    rwMode: rwModes.WRITE,
    isAdvancedEditActive: false,
    addTo: addTo.NOTE,
  },
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
    updateActiveSpaceId: (state, { payload }: PayloadAction<string | null>) => {
      state.activeSpaceId = payload;
    },
    updateActiveTabId: (state, { payload }: PayloadAction<string | null>) => {
      state.activeTabId = payload;
    },
    updateDevice: (state, { payload }: PayloadAction<Device>) => {
      state.device = payload;
    },
    updateAddTo: (state, { payload }: PayloadAction<AddTo>) => {
      state.note.addTo = payload;
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
    toggleRwMode: (state) => {
      state.note.rwMode = state.note.rwMode === rwModes.WRITE ? rwModes.READ : rwModes.WRITE;
    },
    toggleAdvancedEdit: (state) => {
      state.note.isAdvancedEditActive = !state.note.isAdvancedEditActive;
    },
  },
});

export const selectActiveSpace = (state: AppState) => {
  return spaceSelector.getById(state, state.app.activeSpaceId);
};

const PINNED_SORT_VALUE = -1000000;

export const selectSortedSpaceTabs = createSelector(
  [
    (_, { ids }: { ids?: string[]} = {}) => ids || EMPTY_ARRAY, 
    (state: AppState) => state.entities.spaceTab,
  ],
  (tabs, spaceTabEntities) => {
    return tabs.slice().sort((tabA, tabB) => {
      const valueA = (spaceTabEntities[tabA]?.pos || 0) + (spaceTabEntities[tabA]?.isPinned ? PINNED_SORT_VALUE : 0);
      const valueB = (spaceTabEntities[tabB]?.pos || 0) + (spaceTabEntities[tabB]?.isPinned ? PINNED_SORT_VALUE : 0);
      return valueA - valueB;
    });
  }
);

export const selectSortedSpaceTabEntities = createSelector(
  [
    selectSortedSpaceTabs, 
    (state) => state.entities.spaceTab,
    (_, { isPinned }) => isPinned,
  ],
  (tabIds, spaceTabEntities, isPinned): SpaceTabEntity[] => {
    let result = tabIds.map((id) => spaceTabEntities[id]);

    if (isBoolean(isPinned)) {
      result = result.filter(({ isPinned: isPinnedValue }) => isPinnedValue === isPinned);
    }

    return result;
  }
);

export const selectActiveSpaceId = (state: AppState) => {
  return state.app.activeSpaceId;
};

export const selectActiveTabId = (state: AppState) => {
  return state.app.activeTabId;
};

export const selectIsMobile = (state: AppState) => {
  return state.app.device === devices.MOBILE;
};

export const selectActiveTab = createSelector(
  [(state: AppState) => state.entities.spaceTab, selectActiveSpaceId, selectActiveTabId],
  (spaceTabEntities, activeSpaceId, activeTabId) => {
    if (!activeTabId) {
      return null;
    }

    const activeTab = spaceTabEntities[activeTabId];

    return activeTab && activeTab.spaceId === activeSpaceId ? activeTab : null;
  }
);

export const {
  startPageLoading,
  stopPageLoading,
  addWaitedRoute,
  cleanWaitedRoute,
  updateActiveSpaceId,
  updateActiveTabId,
  updateAddTo,
  updateDevice,
  toggleSide,
  toggleRwMode,
  toggleAdvancedEdit,
} = appSlice.actions;

export default appSlice.reducer;
