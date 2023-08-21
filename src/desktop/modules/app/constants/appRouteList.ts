import { tabNames, TabName } from './tabNames';

export type TabListItem = {
  name: TabName,
  path: string,
  title: string,
}

export const tabList: TabListItem[] = [
  {
    name: tabNames.home,
    path: '/',
    title: 'New Tab',
  },
  {
    name: tabNames.note,
    path: '/notes/:noteId',
    title: 'Note',
  },
];
