import { createSelector } from '@reduxjs/toolkit';
import isBoolean from 'lodash/isBoolean';

import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { selectSortedTabIds } from './selectSortedTabIds';

export const selectSortedTabs = createSelector(
  [
    selectSortedTabIds, 
    (state) => state.entities.spaceTab,
    (_, { isPinned }) => isPinned,
  ],
  (tabIds, spaceTabEntities, isPinned): SpaceTabEntity[] => {
    let result = tabIds.map((id) => spaceTabEntities[id]);

    if (isBoolean(isPinned)) {
      result = result.filter(({ isPinned: isPinnedValue }) => isPinnedValue === isPinned);
    }

    return result;
  }
);