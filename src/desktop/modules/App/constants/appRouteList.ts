import { appRouteNames, AppRouteName } from './appRouteNames';

export type AppRouteListItem = {
  name: AppRouteName,
  path: string,
  title: string,
}

export const appRouteList: AppRouteListItem[] = [
  {
    name: appRouteNames.home,
    path: '/',
    title: 'New Tab',
  },
  {
    name: appRouteNames.note,
    path: '/notes/:noteId',
    title: 'Note',
  },
];
