import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { TabsDictionary } from 'shared/types/tabs';

const Home = () => import('./home');
const Note = () => import('./note');

const tabsDictionary = {
  [tabRouteNames.home]: Home,
  [tabRouteNames.note]: Note,
} as TabsDictionary;

export { tabsDictionary };
