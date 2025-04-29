import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ModalId } from 'shared/constants/modalIds';

import { makeModalId } from './util/makeModalId';

type InitialState = {
 stack: string[];
}

const initialState: InitialState = {
  stack: [],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<{ id: ModalId; extraId?: string | number }>) => {
      const { id, extraId = '' } = payload;

      state.stack.push(makeModalId(id, extraId));
    },
    hideModal: (state, { payload }: PayloadAction<{ id: ModalId; extraId?: string | number } | undefined>) => {
      if (payload) {
        const modalId = makeModalId(payload.id, payload.extraId);
        
        state.stack = state.stack.filter(id => id !== modalId);
      } else {
        state.stack = state.stack.slice(0, -1);
      }
    },
    hideModals: (state) => {
      state.stack = [];
    },
  },
});

export const { showModal, hideModal, hideModals } = modalSlice.actions;

export default modalSlice.reducer;
