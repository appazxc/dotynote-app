import { configureStore } from '@reduxjs/toolkit';

import { pokemonApi } from 'shared/services/pokemon';
import reducer from './reducer';

export const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
