import { routeNames } from 'shared/constants/routeNames';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'desktop/routes/Home');
const App = () => import(/* webpackChunkName: "AppPage" */ 'desktop/routes/App');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Home,
};

export { routeDictionary };
