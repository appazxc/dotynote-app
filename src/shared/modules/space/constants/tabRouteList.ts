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
    name: tabRouteNames.profile,
    path: '/profile',
    title: 'Profile',
  },
  {
    name: tabRouteNames.notePreferences,
    path: '/settings/note',
    title: 'Note preferences',
  },
  {
    name: tabRouteNames.settings,
    path: '/settings',
    title: 'Settings',
  },
];
