import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/_router';

const Home = () => import('desktop/_routes/home');
const App = () => import('desktop/_routes/app');
const Login = () => import('desktop/_routes/login');
const Spaces = () => import('desktop/_routes/spaces');
const RedirectNote = () => import('shared/routes/redirectNote');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
  [routeNames.spaces]: Spaces,
  [routeNames.redirectNote]: RedirectNote,
} as RouteDictionary;

export { routeDictionary };
