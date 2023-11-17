import { tabNames } from '../../../../shared/modules/space/constants/tabNames';
import { TabsDictionary } from '../types/tabs';

const Home = () => import(/* webpackChunkName: "HomeTab" */ './home');
const Note = () => import(/* webpackChunkName: "NoteTab" */ './note');

const tabsDictionary = {
  [tabNames.home]: Home,
  [tabNames.note]: Note,
} as TabsDictionary;

export { tabsDictionary };
