import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  isOpen: boolean,
  times: number
}

const initialState: CounterState = {
  isOpen: false,
  times: 0,
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
    inc: (state) => {
      state.times += 1;
    },
  },
});

export const { open, close, inc } = counterSlice.actions;

export default counterSlice.reducer;
