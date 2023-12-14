import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { makeModalId } from './util/makeModalId';

type InitialState = {
 stack: string[],
}

const initialState: InitialState = {
  stack: [],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<{ id: string, modalKey?: string | number }>) => {
      const { id, modalKey = '' } = payload;

      state.stack.push(makeModalId(id, modalKey));
    },
    hideModal: (state) => {
      state.stack = state.stack.slice(0, -1);
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
