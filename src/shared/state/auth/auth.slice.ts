import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface CounterState {
  token: null | string,
  user: null | { name: string },
}

const initialState: CounterState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { addToken } = authSlice.actions;

export const selectIsAuthorized = (state: RootState) => {
  return !!state.auth.user;
};

export default authSlice.reducer;
