import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';
import { appRouteNames } from '../constants/appRouteNames';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'desktop/routes/Home');
const App = () => import(/* webpackChunkName: "AppPage" */ 'desktop/routes/App');

const routeDictionary = {
  [appRouteNames.home]: App,
  [appRouteNames.home]: Home,
  [routeNames.login]: Home,
};

export { routeDictionary };
