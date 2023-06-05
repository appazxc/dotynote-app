import { pokemonApi } from 'shared/services/pokemon';
import appReducer from './app/app.slice';

const reducer = {
  app: appReducer,
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export default reducer;
