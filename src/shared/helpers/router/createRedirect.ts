import { redirect } from 'react-router-dom';
import { RouteName } from 'shared/constants/routeNames';
import { QueryParams, PathParams } from 'shared/types/common/router';

import { getUrl } from './getUrl';

export const createRedirect = (routeName: RouteName, params: { queryParams?: QueryParams, pathParams?: PathParams }) => {
  return redirect(getUrl(routeName, params));
};
