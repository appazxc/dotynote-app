import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

let tabsCount = 5;

export const activeUserSpaceTabs: SpaceTabEntity[] = [...Array(tabsCount)].map((_, index) => ({
  id: String(index + 1),
  userId: '1',
  spaceId: '1',
  pos: (index + 1) * 1000,
  isPinned: false,
  routes: index % 2 ? ['/'] : [`/notes/${index + 1}`],
}));


export const createSpaceTab = (spaceId: string, routes: string[]) => {
  const result =  {
    id: String(Math.random()),
    userId: '1',
    spaceId,
    pos: (tabsCount) * 1000,
    isPinned: false,
    routes,
  };
  
  tabsCount++;

  return result;
};
