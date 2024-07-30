import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Device } from 'shared/constants/devices';
import { AddTo, RwMode, addTo, rwModes } from 'shared/modules/space/tabRoutes/note/constants';

type TempNote = {
  title: string,
  content?: any,
}

type NoOperation = {
  type: null,
};

export type StickOperation = {
  type: 'stick',
  fromNoteId: string,
  noteIds: string[],
  concretePlace: boolean,
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
  operation: NoOperation | StickOperation,
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
  note: {
    rwMode: rwModes.WRITE,
    isAdvancedEditActive: false,
    addTo: addTo.NOTE,
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
    stopOperation: (state) => {
      state.operation = noOperation;
    },
    startStickOperation: (state, { payload }: PayloadAction<{
      fromNoteId: string,
      noteIds: string[],
    }>) => {
      state.operation = {
        type: 'stick',
        fromNoteId: payload.fromNoteId,
        noteIds: payload.noteIds,
        concretePlace: false,
      };
    },
    toggleConcretePlace: (state) => {
      if ('concretePlace' in state.operation) {
        state.operation.concretePlace = !state.operation.concretePlace;
      } 
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
  toggleConcretePlace,
} = appSlice.actions;

export default appSlice.reducer;
