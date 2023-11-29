import { RouteLoader } from 'shared/types/common/router';

import { Home } from './Home';
import { selectToken } from 'shared/store/slices/authSlice';
import { redirect } from 'react-router';
import { getUrl } from 'shared/helpers/router/getUrl';
import { routeNames } from 'shared/constants/routeNames';

const loader: RouteLoader = async ({ store }) => {
  // const { getState } = store;

  // const token = selectToken(getState());

  // if (token) {
  //   return redirect(getUrl(routeNames.app));
  // }

  // return null;
};

export default async function() {
  return {
    Component: Home,
    loader,
  };
}
