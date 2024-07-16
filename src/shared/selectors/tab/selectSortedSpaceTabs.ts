import { createSelector } from '@reduxjs/toolkit';
import { isBoolean } from 'lodash';

import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { selectSortedSpaceTabIds } from './selectSortedSpaceTabIds';

export const selectSortedSpaceTabs = createSelector(
  [
    selectSortedSpaceTabIds, 
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