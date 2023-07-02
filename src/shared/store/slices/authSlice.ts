import { createSlice, createAsyncThunk, AsyncThunkPayloadCreator, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'shared/store';



type InitialState = {
  token: null | string,
  user: null | { name: string },
}

const initialState: InitialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
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

export const { setToken } = authSlice.actions;

export const selectIsAuthorized = (state: AppState) => {
  return !!state.auth.user;
};

export const selectToken = (state: AppState) => {
  return state.auth.token;
};

export default authSlice.reducer;
