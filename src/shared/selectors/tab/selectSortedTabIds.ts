import { createSelector } from '@reduxjs/toolkit';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { AppState } from 'shared/types/store';

const PINNED_SORT_VALUE = -1000000;

export const selectSortedTabIds = createSelector(
  [
    (_, { ids }: { ids?: string[]} = {}) => ids || EMPTY_ARRAY, 
    (state: AppState) => state.entities.spaceTab,
  ],
  (tabs, spaceTabEntities) => {
    return tabs.slice().sort((tabA, tabB) => {
      const valueA = (spaceTabEntities[tabA]?.pos || 0) + (spaceTabEntities[tabA]?.isPinned ? PINNED_SORT_VALUE : 0);
      const valueB = (spaceTabEntities[tabB]?.pos || 0) + (spaceTabEntities[tabB]?.isPinned ? PINNED_SORT_VALUE : 0);
      return valueA - valueB;
    });
  }
);
