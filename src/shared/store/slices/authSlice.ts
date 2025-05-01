import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  token: null | string;
  refreshToken: null | string;
  userId: null | string;
}

const initialState: InitialState = {
  token: null,
  refreshToken: null,
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
    setRefreshToken: (state, { payload }: PayloadAction<string | null>) => {
      state.refreshToken = payload;
    },
    setUser: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
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

export const { setToken, setRefreshToken, setUser } = authSlice.actions;

export default authSlice.reducer;
