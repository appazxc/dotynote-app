import { appRouteNames } from '../constants/appRouteNames';
import { AppRouteDictionary } from '../types/router';

const Home = () => import(/* webpackChunkName: "HomeTab" */ './home');
const Note = () => import(/* webpackChunkName: "NoteTab" */ './note');

const routeDictionary = {
  [appRouteNames.home]: Home,
  [appRouteNames.note]: Note,
} as AppRouteDictionary;

export { routeDictionary };
