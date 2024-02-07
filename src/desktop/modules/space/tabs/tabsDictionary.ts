import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { TabsDictionary } from 'shared/types/tabs';

const Home = () => import('./home');
const Note = () => import('./note');
const CreateNote = () => import('./createNote');
const AddMainNote = () => import('./addMainNote');

const tabsDictionary = {
  [tabRouteNames.home]: Home,
  [tabRouteNames.note]: Note,
  [tabRouteNames.createNote]: CreateNote,
  [tabRouteNames.addMainNote]: AddMainNote,
} as TabsDictionary;

export { tabsDictionary };
