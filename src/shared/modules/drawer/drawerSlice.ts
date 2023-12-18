import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DrawerId } from 'shared/constants/drawerIds';

import { makeDrawerId } from './helpers/makeDrawerId';

type InitialState = {
 stack: string[],
}

const initialState: InitialState = {
  stack: [],
};

export const modalSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    showDrawer: (state, { payload }: PayloadAction<{ id: DrawerId, extraId?: string | number }>) => {
      const { id, extraId = '' } = payload;

      state.stack.push(makeDrawerId(id, extraId));
    },
    hideDrawer: (state) => {
      state.stack = state.stack.slice(0, -1);
    },
  },
});

export const { showDrawer, hideDrawer } = modalSlice.actions;

export default modalSlice.reducer;
