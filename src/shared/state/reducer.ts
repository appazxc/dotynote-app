import { pokemonApi } from 'shared/services/pokemon';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './app/app.slice';
import authReducer from './auth/auth.slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const reducer = {
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export default reducer;
