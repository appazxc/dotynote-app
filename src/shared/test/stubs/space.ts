import { activeUserSpaceTabs } from './spaceTab';

export const activeUserSpace = {
  id: '1',
  name: '',
  isDefault: true,
  sideNoteId: '1',
  activeTabId: '1',
  spaceTabs: activeUserSpaceTabs,
};



const createUserSpace = (id, userId) => ({
  id,
  name: `${id} userId: ${userId}`,
  isDefault: true,
  sideNoteId: '1',
  activeTabId: '1',
  spaceTabs: activeUserSpaceTabs,
});

const AMOUNT = 3;

export const createUserSpaces = (userId) => {
  return [...Array(AMOUNT)].map((_, index) => createUserSpace(String(1 + index), userId));
};