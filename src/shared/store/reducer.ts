import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loadersReducer from 'shared/modules/loaders/loadersSlice';
import modalsReducer from 'shared/modules/modal/modalSlice';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import entitiesReducer from './slices/entitiesSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: ['activeSpaceId', 'activeTabId'],
};

const reducer = {
  entities: entitiesReducer,
  loaders: loadersReducer,
  modals: modalsReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  app: persistReducer(appPersistConfig, appReducer),
};

export default reducer;
