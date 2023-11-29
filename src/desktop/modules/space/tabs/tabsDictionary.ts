import { tabNames } from 'shared/modules/space/constants/tabNames';
import { TabsDictionary } from 'shared/types/tabs';

const Home = () => import('./home');
const Note = () => import('./note');

const tabsDictionary = {
  [tabNames.home]: Home,
  [tabNames.note]: Note,
} as TabsDictionary;

export { tabsDictionary };
