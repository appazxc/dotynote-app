import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import reducer from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type ThunkAction = (dispatch: AppDispatch, getState: () => AppState) => any;

export type AppThunk<ArgType = void, OptionType = void> =
  (ArgType: ArgType, OptionType: OptionType) => ThunkAction;
