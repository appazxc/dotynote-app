import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userSelector } from 'shared/selectors/entities';
import { AppState } from 'shared/store';

type InitialState = {
  token: null | string,
  userId: null | string,
  isLoading: boolean,
}

const initialState: InitialState = {
  token: null,
  userId: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      console.log('token', payload);

      state.token = payload;
    },
    setUser: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(getMe.fulfilled, (state, action) => {
  //       console.log('action', action);
  //     })
  //     .addCase(getMe.rejected, (state, action) => {
  //       console.log('action', action);
  //     });
  // },
});

export const { setToken, setUser, setLoading } = authSlice.actions;

export const selectIsAuthorized = (state: AppState) => {
  return !!state.auth.token && !!state.auth.userId;
};

export const selectIsAuthLoading = (state: AppState) => {
  return state.auth.isLoading;
};

export const selectToken = (state: AppState) => {
  return state.auth.token;
};

export const selectUser = (state: AppState) => {
  return userSelector.getById(state, state.auth.userId);
};

export const selectUserId = (state: AppState) => {
  return state.auth.userId;
};

export default authSlice.reducer;
