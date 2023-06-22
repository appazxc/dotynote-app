import { pokemonApi } from 'shared/services/pokemon';

import appReducer from './app/app.slice';
import authReducer from './auth/auth.slice';

const reducer = {
  app: appReducer,
  auth: authReducer,
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export default reducer;
