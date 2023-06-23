import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from 'shared/services/pokemon';
import { persistStore } from 'redux-persist';

import reducer from './reducer';

export const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
