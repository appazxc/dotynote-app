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
  '/note-not-found': 'Not found',
  [noteRoutePath]: '',
  [`${noteRoutePath}/pinned`]: 'Pinned posts',
  [`${noteRoutePath}/settings`]: 'Note settings',
  [`${noteRoutePath}/posts-settings`]: 'Posts settings',
};

export const getTabTitleByRouteId = (routeId: string, defaultValue: string = ''): string => {
  return routeId in tabTitleMap ? tabTitleMap[routeId] : defaultValue;
};

export const getTabMatch = (path: string, router) => {
  const matches = router.matchRoutes(path, {});

  const match = matches[matches.length - 1];

  return match;
};