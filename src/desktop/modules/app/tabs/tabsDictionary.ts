import { appRouteNames } from '../constants/appRouteNames';
import { TabsDictionary } from '../types/tabs';

const Home = () => import(/* webpackChunkName: "HomeTab" */ './home');
const Note = () => import(/* webpackChunkName: "NoteTab" */ './note');

const tabsDictionary = {
  [appRouteNames.home]: Home,
  [appRouteNames.note]: Note,
} as TabsDictionary;

export { tabsDictionary };
