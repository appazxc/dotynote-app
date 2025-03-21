import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isMobileWidgetOpen: boolean;
  activeId: string | null;
}

const initialState: InitialState = {
  isMobileWidgetOpen: false,
  activeId: null,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    toggleMobileWidget: (state) => {
      state.isMobileWidgetOpen = !state.isMobileWidgetOpen;
    },
    setActiveAudioId: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
  },
});

export const { toggleMobileWidget, setActiveAudioId } = audioSlice.actions;

export default audioSlice.reducer;