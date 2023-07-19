import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loadersReducer from 'shared/modules/loaders/loadersSlice';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import entitiesReducer from './slices/entitiesSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const reducer = {
  app: appReducer,
  entities: entitiesReducer,
  loaders: loadersReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export default reducer;
