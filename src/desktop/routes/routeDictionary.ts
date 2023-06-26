import { routeNames } from 'shared/constants/routeNames';

const Home = () => import(/* HomePage */ 'desktop/routes/Home/lazy');
const App = () => import(/* AppPage */ 'desktop/routes/App/lazy');

const routeDictionary = {
  [routeNames.app]: App,
  [routeNames.home]: Home,
};

export { routeDictionary };
