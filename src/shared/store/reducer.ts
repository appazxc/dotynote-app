import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loadersReducer from 'shared/modules/loaders/loadersSlice';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const reducer = {
  app: appReducer,
  loaders: loadersReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export default reducer;
