import { PathMatch, matchPath } from 'react-router';

import { AppRouteListItem, appRouteList } from '../constants/appRouteList';

type RouteMatch = {
  route: AppRouteListItem,
  pathMatch: PathMatch
}

export const getRouteMatch = (path: string): RouteMatch | null => {
  for (const route of appRouteList) {
    const match = matchPath(route.path, path);

    if (match) {
      return { route, pathMatch: match };
    }
  }

  return null;
};
