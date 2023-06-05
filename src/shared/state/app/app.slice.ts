import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  isOpen: boolean,
}

const initialState: CounterState = {
  isOpen: false,
};

export const counterSlice = createSlice({
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

export const { open, close } = counterSlice.actions;

export default counterSlice.reducer;
