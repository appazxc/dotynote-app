import { redirect } from 'react-router';

import { routeNames } from 'shared/constants/routeNames';
import { addWaitedRoute } from 'shared/store/slices/appSlice';
import { RouteLoader } from 'shared/types/_router';
import { buildUrl } from 'shared/util/router/buildUrl';

const loader: RouteLoader = async ({ store, request }) => {
  const url = new URL(request.url);

  console.log('url', url);
  
  store.dispatch(addWaitedRoute(url.pathname));

  return redirect(buildUrl({ routeName: routeNames.app }));
};

export default async function() {
  return {
    Component: () => null,
    loader,
  };
}
