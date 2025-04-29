import { noteRoutePath } from 'shared/constants/noteRoutePath';

export const getTabInfo = (path: string, router) => {
  const match = getTabMatch(path, router);
  const isNoteTab = match.routeId === noteRoutePath;
  const noteId = isNoteTab ? Number(match.params.noteId) : null;
  const title = getTabTitleByRouteId(match.routeId, 'New Tab');

  return {
    isNoteTab,
    noteId,
    match,
    title,
  };
};

// type Paths = ToOptions<typeof router>['to'];

// type TabTitleMap = Record<Exclude<Paths, undefined | '' | './' | '../'>, string>;

const tabTitleMap = {
  '/': 'New tab',
  '/note-not-found': 'Note not found',
  [noteRoutePath]: '',
  [`${noteRoutePath}/pinned`]: 'Pinned posts',
  [`${noteRoutePath}/settings`]: 'Settings',
  '/search': 'Search',
};

export const getTabTitleByRouteId = (routeId: string, defaultValue: string = ''): string => {
  return routeId in tabTitleMap ? tabTitleMap[routeId] : defaultValue;
};

export const getTabMatch = (path: string, router) => {
  const url = new URL(`http://fake.com${path}`);
  const matches = router.matchRoutes({ pathname: url.pathname });

  const match = matches[matches.length - 1];

  return match;
};