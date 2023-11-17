import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'desktop/routes/Home');
const App = () => import(/* webpackChunkName: "AppPage" */ 'desktop/routes/app');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Home,
} as RouteDictionary;

export { routeDictionary };
