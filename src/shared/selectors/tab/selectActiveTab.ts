import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

import { selectActiveSpaceId } from '../space/selectActiveSpaceId';

import { selectActiveTabId } from './selectActiveTabId';

export const selectActiveTab = createSelector(
  [(state: AppState) => state.entities.spaceTab, selectActiveSpaceId, selectActiveTabId],
  (spaceTabEntities, activeSpaceId, activeTabId) => {
    if (!activeTabId) {
      return null;
    }

    const activeTab = spaceTabEntities[activeTabId];

    return activeTab && activeTab.spaceId === activeSpaceId ? activeTab : null;
  }
);