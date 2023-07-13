import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'mobile/routes/Home');
const App = () => import(/* webpackChunkName: "AppPage" */ 'mobile/routes/App');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Home,
} as RouteDictionary;

export { routeDictionary };
