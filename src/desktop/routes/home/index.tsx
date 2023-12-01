import { RouteLoader } from 'shared/types/common/router';

import { Home } from './Home';

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
