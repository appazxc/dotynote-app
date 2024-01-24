import { tabRouteNames, TabName } from './tabRouteNames';

export type TabListItem = {
  name: TabName,
  path: string,
  title: string,
}

export const tabList: TabListItem[] = [
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
