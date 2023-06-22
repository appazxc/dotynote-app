import { createSlice } from '@reduxjs/toolkit';

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

export default authSlice.reducer;
