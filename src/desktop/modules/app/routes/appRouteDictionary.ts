import { appRouteNames } from '../constants/appRouteNames';
import { AppRouteDictionary } from '../types/router';
import Home from './home';
import Note from './note';

const routeDictionary = {
  [appRouteNames.home]: Home,
  [appRouteNames.note]: Note,
} as AppRouteDictionary;

export { routeDictionary };
