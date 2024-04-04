import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpaceId, selectSortedSpaceTabEntities } from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const reorderTabs = (newTabs: SpaceTabEntity[]) => async (dispatch, getState) => {
  const activeSpaceId = selectActiveSpaceId(getState());

  if (!activeSpaceId) {
    return;
  }
    
  const tabIds = queryClient.getQueryData(options.spaceTabs.list({ spaceId: activeSpaceId }).queryKey);
  const sortedTabs = selectSortedSpaceTabEntities(getState(), { ids: tabIds });

  console.log('newTabs', newTabs, sortedTabs);
  
  let first: SpaceTabEntity | null = null;
  let updated: SpaceTabEntity | null = null;
  let next: SpaceTabEntity | null = null;

  for (let i = 0; i < newTabs.length; i++) {
    const newTab = newTabs[i];
    const oldTab = sortedTabs[i];

    if (newTab.id === oldTab.id) {
      console.log('continue', newTab, oldTab);
      
      continue;
    }

    if (!newTab.isPinned && oldTab.isPinned) {
      break;
    }

    console.log('FIRST', newTab);
    
    first = newTab;
    updated = newTabs[i + 1];
    next = newTabs[i + 2] || null;
    
    if (updated.isPinned && !next?.isPinned) {
      next = null;
    }

    break;
  }

  console.log(first, updated, next);
  
  if (!updated || !first) {
    return;
  }

  const newPos = next ? Math.floor((next.pos + first.pos) / 2) : first.pos + 1000;

  console.log('new Pos', newPos);
  
  await entityApi.spaceTab.update(updated.id, { pos: newPos });
};