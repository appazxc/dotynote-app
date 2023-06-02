import { pokemonApi } from 'shared/services/pokemon';
import appReducer from './app/app.slice';
import counterReducer from './counter/counter.slice';

const reducer = {
  counter: counterReducer,
  app: appReducer,
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export default reducer;
