import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import('desktop/routes/home');
const App = () => import('desktop/routes/app');
const Login = () => import('desktop/routes/login');
const Spaces = () => import('desktop/routes/spaces');
const RedirectNote = () => import('shared/routes/redirectNote');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
  [routeNames.spaces]: Spaces,
  [routeNames.redirectNote]: RedirectNote,
} as RouteDictionary;

export { routeDictionary };
