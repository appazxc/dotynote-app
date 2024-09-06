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
  '/n/$noteId/settings': 'Note settings',
};

export const getTabTitleByRouteId = (routeId: string, defaultValue: string = ''): string => {
  return routeId in tabTitleMap ? tabTitleMap[routeId] : defaultValue;
};

export const getTabMatch = (path: string, router) => {
  const matches = router.matchRoutes(path, {});

  const match = matches[matches.length - 1];

  return match;
};