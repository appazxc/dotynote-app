import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/_router';

const Home = () => import('mobile/routes/home');
const App = () => import('mobile/routes/app');
const Login = () => import('mobile/routes/login');
const Tabs = () => import('mobile/routes/tabs');
const Search = () => import('mobile/routes/search');
const Profile = () => import('mobile/routes/profile');
const Account = () => import('mobile/routes/account');
const RedirectNote = () => import('shared/routes/redirectNote');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
  [routeNames.tabs]: Tabs,
  [routeNames.search]: Search,
  [routeNames.profile]: Profile,
  [routeNames.account]: Account,
  [routeNames.redirectNote]: RedirectNote,
} as RouteDictionary;

export { routeDictionary };
