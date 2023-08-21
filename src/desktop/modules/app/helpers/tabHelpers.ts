import { PathMatch, matchPath } from 'react-router';
import { tabNames } from 'desktop/modules/app/constants/tabNames';

import { TabListItem, tabList } from 'desktop/modules/app/constants/appRouteList';

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
  const match = getTabMatch(path);

  const isNoteTab = match?.route.name === tabNames.note;
  const noteId = match?.pathMatch.params.noteId;

  return {
    isNoteTab,
    noteId,
    match,
  };
};