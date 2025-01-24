// audioSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import isNumber from 'lodash/isNumber';

type InitialState = {
  isPlaying: boolean,
  audioId: string | null,
  currentTime: number,
  startTime: number,
}

export type StartAudioParams = {
  audioId: string,
  startTime?: number;
}

export type PlayAudioParams = {
  startTime?: number;
}

const initialState: InitialState = {
  isPlaying: false,
  audioId: null,
  currentTime: 0, 
  startTime: 0,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    startAudio: (state, { payload }: PayloadAction<StartAudioParams>) => {
      state.audioId = payload.audioId;
      state.startTime = payload.startTime || 0;
      state.currentTime = state.startTime;
      state.isPlaying = true;
    },
    resumeAudio: (state) => {
      state.isPlaying = true;
    },
    playAudio: (state, { payload }: PayloadAction<PlayAudioParams>) => {
      if (isNumber(payload.startTime)) {
        state.startTime = payload.startTime;
      }

      state.isPlaying = true;
    },
    updateAudioCurrentTime: (state, { payload }: PayloadAction<number>) => {
      state.currentTime = payload;
    },
    pauseAudio: (state) => {
      state.startTime = state.currentTime;
      state.isPlaying = false;
    },
  },
});

export const { startAudio, playAudio, pauseAudio, resumeAudio, updateAudioCurrentTime } = audioSlice.actions;
export default audioSlice.reducer;