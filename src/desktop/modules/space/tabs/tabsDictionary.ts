import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { TabsDictionary } from 'shared/types/tabs';

const Home = () => import('./home');
const Note = () => import('./note');
const CreateNote = () => import('./createNote');
const AddMainNote = () => import('./addMainNote');
const Settings = () => import('./settings');

const tabsDictionary = {
  [tabRouteNames.home]: Home,
  [tabRouteNames.note]: Note,
  [tabRouteNames.createNote]: CreateNote,
  [tabRouteNames.addMainNote]: AddMainNote,
  [tabRouteNames.profile]: Note,
  [tabRouteNames.settings]: Settings,
  [tabRouteNames.notePreferences]: Note,
} as TabsDictionary;

export { tabsDictionary };
