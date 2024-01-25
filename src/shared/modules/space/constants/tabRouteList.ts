import { tabRouteNames, TabName } from './tabRouteNames';

export type TabRouteListItem = {
  name: TabName,
  path: string,
  title: string,
}

export const tabRouteList: TabRouteListItem[] = [
  {
    name: tabRouteNames.home,
    path: '/',
    title: 'New tab',
  },
  {
    name: tabRouteNames.addMainNote,
    path: '/addMainNote',
    title: 'Add main note',
  },
  {
    name: tabRouteNames.note,
    path: '/n/:noteId',
    title: 'Note',
  },
  {
    name: tabRouteNames.createNote,
    path: '/createNote',
    title: 'Create note',
  },
];
