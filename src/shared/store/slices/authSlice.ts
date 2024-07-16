import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  token: null | string,
  userId: null | string,
}

const initialState: InitialState = {
  token: null,
  userId: null,
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

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
