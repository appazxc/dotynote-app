import { routeNames } from 'shared/constants/routeNames';
import { RouteDictionary } from 'shared/types/common/router';

const Home = () => import(/* webpackChunkName: "HomePage" */ 'mobile/routes/home');
const App = () => import(/* webpackChunkName: "AppPage" */ 'mobile/routes/app');
const Login = () => import(/* webpackChunkName: "LoginPage" */ 'mobile/routes/login');
const Tabs = () => import(/* webpackChunkName: "TabsPage" */ 'mobile/routes/tabs');
const Search = () => import(/* webpackChunkName: "SearchPage" */ 'mobile/routes/search');
const Profile = () => import(/* webpackChunkName: "ProfilePage" */ 'mobile/routes/profile');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
  [routeNames.login]: Login,
  [routeNames.tabs]: Tabs,
  [routeNames.search]: Search,
  [routeNames.profile]: Profile,
} as RouteDictionary;

export { routeDictionary };
