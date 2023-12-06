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
    name: tabNames.addMainNote,
    path: '/addMainNote',
    title: 'Add main note',
  },
  {
    name: tabNames.note,
    path: '/n/:noteId',
    title: 'Note',
  },
];
