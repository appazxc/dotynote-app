import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Loader } from 'shared/constants/loaderIds';
import { AppState } from 'shared/store';

type InitialState = {
  ids: {
    [key in keyof Loader]?: boolean
  },
  isPageLoading: boolean,
  appLoaders: Loader[]
}

const initialState: InitialState = {
  ids: {},
  isPageLoading: false,
  appLoaders: [],
};

export const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    startAppLoader: (state, { payload: loaderId }: PayloadAction<Loader>) => {
      state.appLoaders.push(loaderId);
    },
    stopAppLoader: (state, { payload: loaderId }: PayloadAction<Loader>) => {
      state.appLoaders = state.appLoaders.filter((id) => id !== loaderId);
    },
    startLoader: (state, action: PayloadAction<Loader>) => {
      state.ids[action.payload] = true;
    },
    stopLoader: (state, action: PayloadAction<Loader>) => {
      delete state.ids[action.payload];
    },
    startPageLoading: (state) => {
      state.isPageLoading = true;
    },
    stopPageLoading: (state) => {
      state.isPageLoading = false;
    },
  },
});

export const selectIsLoaderInProgress = (state: AppState, loaderId: Loader) => {
  return !!state.loaders.ids[loaderId];
};

export const selectIsLoadersInProgress = (state: AppState, loaderIds: Loader[]) => {
  return loaderIds.some(id => state.loaders.ids[id]);
};

export const { 
  startLoader,
  stopLoader, 
  startPageLoading,
  stopPageLoading ,
  startAppLoader,
  stopAppLoader,
} = loadersSlice.actions;

export default loadersSlice.reducer;
