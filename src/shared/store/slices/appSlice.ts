import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Device } from 'shared/constants/devices';
import { AddTo, RwMode, addTo, rwModes } from 'shared/modules/noteTab/constants';

type TempNote = {
  title: string,
  content?: any,
}

type NoOperation = {
  type: null,
};

export const operationTypes = {
  STICK: 'stick',
  MOVE: 'move',
  PRIMARY_NOTE: 'primaryNote',
  HUB: 'hub',
  SELECT: 'select',
} as const;

export type StickOperation = {
  type: typeof operationTypes.STICK,
  fromNoteId: number | null,
  noteIds: number[],
  concretePlace: boolean,
  concretePostId?: number,
}

export type PrimaryNoteOperation = {
  type: typeof operationTypes.PRIMARY_NOTE,
}

export type HubOperation = {
  type: typeof operationTypes.HUB,
}

export type SelectOperation = {
  type: typeof operationTypes.SELECT,
  noteId: number,
  postIds: number[],
}

export type MoveOperation = {
  type: typeof operationTypes.MOVE,
  fromNoteId: number,
  postIds: number[],
  concretePlace: boolean,
  concretePostId?: number,
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
  primaryNoteTabIds: {
    [x: string]: string
  },
  note: {
    rwMode: RwMode,
    isAdvancedEditActive: boolean,
    addTo: AddTo,
    isSearchActive: boolean,
  },
  operation: NoOperation | StickOperation | MoveOperation | PrimaryNoteOperation | HubOperation | SelectOperation,
};

const noOperation = { type: null };

const initialState: InitialState = {
  isSideOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
  activeTabId: null,
  waitedRoute: null,
  device: null,
  tempNote: null,
  primaryNoteTabIds: {},
  note: {
    rwMode: rwModes.WRITE,
    isAdvancedEditActive: false,
    addTo: addTo.NOTE,
    isSearchActive: false,
  },
  operation: noOperation,
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
    toggleSearch: (state) => {
      state.note.isSearchActive = !state.note.isSearchActive;
    },
    stopOperation: (state) => {
      state.operation = noOperation;
    },
    updateOperationConcretePost: (
      state, 
      { payload }: PayloadAction<number>
    ) => {
      if ('concretePlace' in state.operation) {
        state.operation.concretePostId = payload;
      } 
    },
    startStickOperation: (
      state, 
      { payload }: PayloadAction<{
        fromNoteId?: number,
        noteIds: number[],
      }>
    ) => {
      state.operation = {
        type: operationTypes.STICK,
        fromNoteId: payload.fromNoteId || null,
        noteIds: payload.noteIds,
        concretePlace: false,
      };
    },
    startMoveOperation: (
      state, 
      { payload }: PayloadAction<{
        fromNoteId: number,
        postIds: number[],
      }>
    ) => {
      state.operation = {
        type: operationTypes.MOVE,
        fromNoteId: payload.fromNoteId,
        postIds: payload.postIds,
        concretePlace: false,
      };
    },
    startPrimaryNoteOperation: (state) => {
      state.operation = {
        type: operationTypes.PRIMARY_NOTE,
      };
    },
    startHubOperation: (state) => {
      state.operation = {
        type: operationTypes.HUB,
      };
    },
    startSelectOperation: (
      state,
      { payload }: PayloadAction<{
        noteId: number,
        postId: number,
      }>
    ) => {
      state.operation = {
        type: operationTypes.SELECT,
        postIds: [payload.postId],
        noteId: payload.noteId,
      };
    },
    toggleConcretePlace: (state) => {
      if ('concretePlace' in state.operation) {
        state.operation.concretePlace = !state.operation.concretePlace;
      } 
    },
    togglePostSelect: (state, { payload }: PayloadAction<number>) => {
      if (state.operation.type !== operationTypes.SELECT) {
        return;
      } 
      
      if (state.operation.postIds.includes(payload)) {
        const newPostsIds = state.operation.postIds.filter(id => id !== payload);
        state.operation.postIds = newPostsIds;

        if (newPostsIds.length === 0) {
          state.operation = noOperation;
        }
      } else {
        state.operation.postIds.push(payload);
      }
    },
    addPrimaryNoteTab: (
      state, 
      { payload }: PayloadAction<{ spaceId: string, primaryNoteId: number, tabId: string }>
    ) => {
      const { 
        spaceId,
        primaryNoteId,
        tabId,
      } = payload;

      state.primaryNoteTabIds[`${spaceId}|${primaryNoteId}`] = tabId;
    },
  },
});

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
  stopOperation,
  startStickOperation,
  startMoveOperation,
  toggleSearch,
  startPrimaryNoteOperation,
  startSelectOperation,
  toggleConcretePlace,
  togglePostSelect,
  updateOperationConcretePost,
  addPrimaryNoteTab,
  startHubOperation,
} = appSlice.actions;

export default appSlice.reducer;
