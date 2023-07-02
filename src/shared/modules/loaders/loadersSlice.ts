import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Loader } from 'shared/constants/loaderIds';
import { AppState } from 'shared/store';

type InitialState = {
  ids: {
    [key in keyof Loader]?: boolean
  }
}

const initialState: InitialState = {
  ids: {},
};

export const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    startLoader: (state, action: PayloadAction<Loader>) => {
      state.ids[action.payload] = true;
    },
    stopLoader: (state, action: PayloadAction<Loader>) => {
      delete state.ids[action.payload];
    },
  },
});

export const selectIsLoaderInProgress = (state: AppState, loaderId: Loader) => {
  return !!state.loaders.ids[loaderId];
};

export const selectIsLoadersInProgress = (state: AppState, loaderIds: Loader[]) => {
  return loaderIds.some(id => state.loaders.ids[id]);
};

export const { startLoader, stopLoader } = loadersSlice.actions;

export default loadersSlice.reducer;
