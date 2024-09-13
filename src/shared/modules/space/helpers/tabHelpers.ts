export const getTabInfo = (path: string, router) => {
  const match = getTabMatch(path, router);
  const isNoteTab = match.routeId === '/n/$noteId';
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
  '/n/$noteId': '',
  '/n/$noteId/settings': 'Note settings',
};

export const getTabTitleByRouteId = (routeId: string, defaultValue: string = ''): string => {
  console.log('routeId', routeId);
  return routeId in tabTitleMap ? tabTitleMap[routeId] : defaultValue;
};

export const getTabMatch = (path: string, router) => {
  const matches = router.matchRoutes(path, {});

  const match = matches[matches.length - 1];

  return match;
};