import { generatePath } from 'react-router-dom';

import { QueryParams, PathParams } from 'shared/types/common/router';

export const createBuildUrl = <T extends { name: string, path: string }, K>(routeList: T[]) => {
  return (params: { routeName: K, pathParams?: PathParams, queryParams?: QueryParams }) => {
    const { 
      routeName,
      pathParams,
      queryParams,
    } = params;
    const route = routeList.find(({ name }) => name === routeName);

    if (!route) {
      console.log('routeName', routeName);
      
      throw new Error(`Route "${routeName}" not found`);
    }

    return generatePath(route.path, pathParams) + (
      queryParams 
        ? `?${new URLSearchParams(queryParams).toString()}` 
        : ''
    );
  };
};
