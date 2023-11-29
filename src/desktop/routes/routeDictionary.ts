import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'desktop/routes/home1');
const App = () => import(/* webpackChunkName: "AppPage" */ 'desktop/routes/app1');
const Login = () => import(/* webpackChunkName: "LoginPage" */ 'desktop/routes/login1');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
} as RouteDictionary;

export { routeDictionary };
