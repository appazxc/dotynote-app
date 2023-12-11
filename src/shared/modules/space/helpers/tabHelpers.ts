import { PathMatch, matchPath } from 'react-router';

import { tabNames } from 'shared/modules/space/constants/tabNames';
import { TabListItem, tabList } from 'shared/modules/space/constants/tabRouteList';

type RouteMatch = {
  route: TabListItem,
  pathMatch: PathMatch
}

export const getTabMatch = (path: string): RouteMatch | null => {
  for (const route of tabList) {
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
  const isNoteTab = match?.route.name === tabNames.note;
  const searhParams = Object.fromEntries([...url.searchParams]);
  const noteId = match?.pathMatch.params.noteId;

  return {
    isNoteTab,
    noteId,
    match,
    searhParams,
  };
};