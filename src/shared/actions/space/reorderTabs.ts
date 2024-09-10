import { entityApi } from 'shared/api/entityApi';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const reorderTabs = (newOrderTabIds: string[], isPinned: boolean) => async (dispatch, getState) => {
  const activeSpace = selectActiveSpace(getState());

  if (!activeSpace) {
    return;
  }
    
  const sortedTabs = selectSortedTabs(getState()).filter((tab) => tab.isPinned === isPinned);
  const newOrderTabs = spaceTabSelector.getByIds(getState(), newOrderTabIds);

  let first: SpaceTabEntity | null = null;
  let updated: SpaceTabEntity | null = null;
  let next: SpaceTabEntity | null = null;

  for (let i = 0; i < newOrderTabIds.length; i++) {
    const newTab = newOrderTabs[i];
    const oldTab = sortedTabs[i];

    if (newTab.id === oldTab.id) {
      continue;
    }

    if (!newTab.isPinned && oldTab.isPinned) {
      break;
    }

    first = newTab;
    updated = newOrderTabs[i + 1];
    next = newOrderTabs[i + 2] || null;
    
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