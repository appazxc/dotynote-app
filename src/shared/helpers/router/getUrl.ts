import { generatePath } from 'react-router-dom';
import { routeList } from 'shared/constants/routeList';
import { RouteName } from 'shared/constants/routeNames';
import { QueryParams, PathParams } from 'shared/types/common/router';

type Params = { queryParams?: QueryParams, pathParams?: PathParams };

export const getUrl = (routeName: RouteName, params: Params = {}) => {
  const route = routeList.find(({ name }) => name === routeName);

  if (!route) {
    throw new Error('Route not found');
  }

  const { queryParams, pathParams } = params;

  return generatePath(route.path, pathParams) + queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
};
