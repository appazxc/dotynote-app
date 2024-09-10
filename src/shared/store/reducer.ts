import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { actions } from 'shared/constants/actions';
import drawersReducer from 'shared/modules/drawer/drawerSlice';
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
  whitelist: ['activeSpaceId', 'activeTabId', 'note'],
};

const entities = combineReducers({

})

const reducer = combineReducers({
  entities: entitiesReducer,
  loaders: loadersReducer,
  modals: modalsReducer,
  drawers: drawersReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  app: persistReducer(appPersistConfig, appReducer),
});

const rootReducer = (state, action) => {
  if (action.type === actions.RESET_APP) {
    state = undefined;
  }

  return reducer(state, action);
};

export default rootReducer;
