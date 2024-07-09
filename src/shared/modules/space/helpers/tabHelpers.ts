import { ToOptions } from '@tanstack/react-router';

import { note } from 'desktop/modules/space/tabRoutes/note';
import { router } from 'desktop/modules/space/tabRoutes/router';

export const getTabInfo = (path: string) => {
  const match = getTabMatch(path);
  const isNoteTab = match.routeId === note.id;
  const noteId = match.params.noteId;

  return {
    isNoteTab,
    noteId,
    match,
  };
};

type Paths = ToOptions<typeof router>['to'];

type TabTitleMap = Record<Exclude<Paths, undefined | '' | './' | '../'>, string>;

const tabTitleMap: TabTitleMap = {
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

export const getTabMatch = (path: string) => {
  const matches = router.matchRoutes(path, {});

  const match = matches[matches.length - 1];

  return match;
};