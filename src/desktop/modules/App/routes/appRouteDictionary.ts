import { appRouteNames } from '../constants/appRouteNames';
import { AppRouteDictionary } from '../types/router';

const Home = () => import(/* webpackChunkName: "AppHomePage" */ './home');
const Note = () => import(/* webpackChunkName: "AppNotePage" */ './note');

const routeDictionary = {
  [appRouteNames.home]: Home,
  [appRouteNames.note]: Note,
} as AppRouteDictionary;

export { routeDictionary };
