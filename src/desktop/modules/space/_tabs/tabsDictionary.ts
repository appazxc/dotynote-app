import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { TabsDictionary } from 'shared/types/tabs';

const Home = () => import('./home');
const AddMainNote = () => import('./addMainNote');
const Settings = () => import('./settings');
const Profile = () => import('./profile');
const NoteSettings = () => import('./noteSettings');

const tabsDictionary = {
  [tabRouteNames.home]: Home,
  [tabRouteNames.addMainNote]: AddMainNote,
  [tabRouteNames.profile]: Profile,
  [tabRouteNames.settings]: Settings,
  [tabRouteNames.notePreferences]: NoteSettings,
} as TabsDictionary;

export { tabsDictionary };
