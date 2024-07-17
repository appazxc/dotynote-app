export const getTabInfo = (path: string, router) => {
  const match = getTabMatch(path, router);
  const isNoteTab = match.routeId === '/n/$noteId';
  const noteId = match.params.noteId;
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
  '/addMainNote': 'Add main note',
  '/n/$noteId': '',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/settings/$id': '',
  '/settings/note': '',
};

export const getTabTitleByRouteId = (routeId: string, defaultValue: string = ''): string => {
  return tabTitleMap[routeId] || defaultValue;
};

export const getTabMatch = (path: string, router) => {
  const matches = router.matchRoutes(path, {});

  const match = matches[matches.length - 1];

  return match;
};