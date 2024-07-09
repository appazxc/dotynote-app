import { Router, ToPathOption } from '@tanstack/react-router';
import { PathMatch, matchPath } from 'react-router';

import { TabRouteListItem, tabRouteList } from 'shared/modules/space/constants/tabRouteList';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';

import { router } from 'desktop/modules/space/tabRoutes/router';

type RouteMatch = {
  route: TabRouteListItem,
  pathMatch: PathMatch
}

export const getTabMatch = (path: string): RouteMatch | null => {
  console.log('new match', path, router.matchRoutes(path, {}));
  for (const route of tabRouteList) {
    const match = matchPath(route.path, path);

    if (match) {
      return { route, pathMatch: match };
    }
  }

  return null;
};

export const getTabInfo = (path: string) => {
  const url = new URL(`http://example.ru${path}`);
  const match = getTabMatch(url.pathname);
  const isNoteTab = match?.route.name === tabRouteNames.note;
  const searhParams = Object.fromEntries([...url.searchParams]);
  const noteId = match?.pathMatch.params.noteId;

  return {
    isNoteTab,
    noteId,
    match,
    searhParams,
  };
};