import { entityApi } from 'shared/api/entityApi';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const reorderTabs = (newTabs: SpaceTabEntity[], isPinned: boolean) => async (dispatch, getState) => {
  const activeSpace = selectActiveSpace(getState());

  if (!activeSpace) {
    return;
  }
    
  const sortedTabs = selectSortedTabs(getState()).filter((tab) => tab.isPinned === isPinned);
console.log('here', newTabs, sortedTabs);
  
  let first: SpaceTabEntity | null = null;
  let updated: SpaceTabEntity | null = null;
  let next: SpaceTabEntity | null = null;

  for (let i = 0; i < newTabs.length; i++) {
    const newTab = newTabs[i];
    const oldTab = sortedTabs[i];

    if (newTab.id === oldTab.id) {
      continue;
    }

    if (!newTab.isPinned && oldTab.isPinned) {
      break;
    }

    first = newTab;
    updated = newTabs[i + 1];
    next = newTabs[i + 2] || null;
    
    if (updated.isPinned && !next?.isPinned) {
      next = null;
    }

    break;
  }

  if (!updated || !first) {
    return;
  }

  const newPos = next ? Math.floor((next.pos + first.pos) / 2) : first.pos + 1000;
  await entityApi.spaceTab.update(updated.id, { pos: newPos });
};