import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isMobileWidgetOpen: boolean;
}

const initialState: InitialState = {
  isMobileWidgetOpen: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    toggleMobileWidget: (state) => {
      state.isMobileWidgetOpen = !state.isMobileWidgetOpen;
    },
  },
});

export const { toggleMobileWidget } = audioSlice.actions;
export default audioSlice.reducer;