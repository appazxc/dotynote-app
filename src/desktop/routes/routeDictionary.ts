import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'desktop/routes/home');
const App = () => import(/* webpackChunkName: "AppPage" */ 'desktop/routes/app');
const Login = () => import(/* webpackChunkName: "LoginPage" */ 'desktop/routes/login');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
} as RouteDictionary;

export { routeDictionary };
