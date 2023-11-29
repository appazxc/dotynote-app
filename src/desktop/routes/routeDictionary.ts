import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import('desktop/routes/home');
const App = () => import('desktop/routes/app');
const Login = () => import('desktop/routes/login');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
} as RouteDictionary;

export { routeDictionary };
