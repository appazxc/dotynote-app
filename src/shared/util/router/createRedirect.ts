import { redirect } from 'react-router-dom';

import { RouteName } from 'shared/constants/routeNames';
import { QueryParams, PathParams } from 'shared/types/common/router';

import { buildUrl } from './buildUrl';

export const createRedirect = (routeName: RouteName, pathParams: PathParams, queryParams?: QueryParams) => {
  return redirect(buildUrl({ routeName, pathParams, queryParams }));
};
