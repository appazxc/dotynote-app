import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Device } from 'shared/constants/devices';
import { AddTo, RwMode, addTo, rwModes } from 'shared/modules/noteTab/constants';

type TempNote = {
  title: string;
  content?: any;
}

type NoOperation = {
  type: null;
};

export const operationTypes = {
  STICK: 'stick',
  MOVE: 'move',
  PRIMARY_NOTE: 'primaryNote',
  SELECT: 'select',
  SELECT_NOTE_IMAGES: 'selectNoteImages',
} as const;

export type StickOperation = {
  type: typeof operationTypes.STICK;
  fromNoteId: string | null;
  noteIds: string[];
  postIds: string[];
  concretePlace: boolean;
  concretePostId?: string;
}

export type PrimaryNoteOperation = {
  type: typeof operationTypes.PRIMARY_NOTE;
}

export type SelectNoteImagesOperation = {
  type: typeof operationTypes.SELECT_NOTE_IMAGES;
  imageIds: string[];
  noteId: string;
}

export type SelectOperation = {
  type: typeof operationTypes.SELECT;
  noteIds: string[];
  postIds: string[];
  parentId: string;
}

export type MoveOperation = {
  type: typeof operationTypes.MOVE;
  fromNoteId: string;
  postIds: string[];
  concretePlace: boolean;
  concretePostId?: string;
}

type OperationType =
  | NoOperation 
  | StickOperation 
  | MoveOperation 
  | PrimaryNoteOperation
  | SelectOperation
  | SelectNoteImagesOperation

type InitialState = {
  isSideOpen: boolean;
  isPageLoading: boolean;
  activeSpaceId: string | null;
  // when user enter some link we redirect him to app and open tab with this route
  waitedRoute: string | null;
  device: Device | null;
  isDeviceLocked: boolean;
  tempNote: TempNote | null;
  primaryNoteTabIds: {
    [x: string]: string;
  };
  note: {
    rwMode: RwMode;
    isAdvancedEditActive: boolean;
    addTo: AddTo;
    isSearchActive: boolean;
  };
  operation: OperationType;
};

const noOperation = { type: null };

const initialState: InitialState = {
  isSideOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
  waitedRoute: null,
  device: null,
  isDeviceLocked: false,
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
    lockDevice: (state) => {
      state.isDeviceLocked = true;
    },
    unlockDevice: (state) => {
      state.isDeviceLocked = false;
    },
    updateOperationConcretePost: (
      state, 
      { payload }: PayloadAction<string>
    ) => {
      if ('concretePlace' in state.operation) {
        state.operation.concretePostId = payload;
      } 
    },
    startStickOperation: (
      state, 
      { payload }: PayloadAction<{
        fromNoteId?: string;
        noteIds?: string[];
        postIds?: string[];
      }>
    ) => {
      state.operation = {
        type: operationTypes.STICK,
        fromNoteId: payload.fromNoteId || null,
        noteIds: payload.noteIds || [],
        postIds: payload.postIds || [],
        concretePlace: false,
      };
    },
    startMoveOperation: (
      state, 
      { payload }: PayloadAction<{
        fromNoteId: string;
        postIds: string[];
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
    startSelectOperation: (
      state,
      { payload }: PayloadAction<{
        parentId: string;
        postId?: string;
        noteId?: string;
      }>
    ) => {
      state.operation = {
        type: operationTypes.SELECT,
        parentId: payload.parentId,
        noteIds: payload.noteId ? [payload.noteId] : [],
        postIds: payload.postId ? [payload.postId] : [],
      };
    },
    startSelectNoteImagesOperation: (
      state,
      { payload }: PayloadAction<{
        noteId: string;
        imageId: string;
      }>
    ) => {
      state.operation = {
        type: operationTypes.SELECT_NOTE_IMAGES,
        imageIds: [payload.imageId],
        noteId: payload.noteId,
      };
    },
    toggleSelectNoteImage: (
      state,
      { payload: imageId }: PayloadAction<string>
    ) => {
      if (state.operation.type !== operationTypes.SELECT_NOTE_IMAGES) {
        return;
      } 

      if (state.operation.imageIds.includes(imageId)) {
        state.operation.imageIds = state.operation.imageIds.filter(id => id !== imageId);
      } else {
        state.operation.imageIds = [...state.operation.imageIds, imageId];
      }

      if (state.operation.imageIds.length === 0) {
        state.operation = noOperation;
      }
    },
    toggleConcretePlace: (state) => {
      if ('concretePlace' in state.operation) {
        state.operation.concretePlace = !state.operation.concretePlace;
      } 
    },
    togglePostSelect: (state, { payload }: PayloadAction<string>) => {
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
      { payload }: PayloadAction<{ spaceId: string; primaryNoteId: string; tabId: string }>
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
  startSelectNoteImagesOperation,
  toggleSelectNoteImage,
  lockDevice,
  unlockDevice,
} = appSlice.actions;

export default appSlice.reducer;
