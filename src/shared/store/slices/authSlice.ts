import { createSlice, createAsyncThunk, AsyncThunkPayloadCreator, PayloadAction } from '@reduxjs/toolkit';
import api from 'shared/api';
import { AppDispatch, AppState, AppThunk } from 'shared/store';

export const fetchMe: AppThunk = () => async (dispatch, getState) => {
  const token = selectToken(getState());

  if (!token) {
    return;
  }

  dispatch(setLoading(true));

  try {
    const user = await api.loadMe();
    dispatch(setUser(user));
  } catch (e) {
    dispatch(setToken(null));
  } finally {
    dispatch(setLoading(false));
  }
};

type InitialState = {
  token: null | string,
  user: null | { name: string },
  isLoading: boolean,
}

const initialState: InitialState = {
  token: null,
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
    setUser: (state, { payload }: PayloadAction<{ name: string }>) => {
      state.user = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(getMe.fulfilled, (state, action) => {
  //       console.log('action', action);
  //     })
  //     .addCase(getMe.rejected, (state, action) => {
  //       console.log('action', action);
  //     });
  // },
});

export const { setToken, setUser, setLoading } = authSlice.actions;

export const selectIsAuthenticated = (state: AppState) => {
  return !!state.auth.token && !!state.auth.user;
};

export const selectIsAuthLoading = (state: AppState) => {
  return state.auth.isLoading;
};

export const selectToken = (state: AppState) => {
  return state.auth.token;
};

export default authSlice.reducer;
