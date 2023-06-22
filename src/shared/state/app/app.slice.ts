import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  isOpen: boolean,
}

const initialState: CounterState = {
  isOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = appSlice.actions;

export default appSlice.reducer;
