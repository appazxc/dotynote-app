import { createSelector } from '@reduxjs/toolkit';
import { denormalize } from 'normalizr';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { spaceTabSchema } from 'shared/schemas/spaceTab.schema';
import { spaceSelector } from 'shared/selectors/entities';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { AppState } from 'shared/types/store';

export const selectSortedTabs = createSelector(
  [
    state => spaceSelector.getById(state, state.app.activeSpaceId)?.tabs || EMPTY_ARRAY, 
    (state: AppState) => state.entities.spaceTab,
  ],
  (tabIds, spaceTab): SpaceTabEntity[] => {
    const tabs = denormalize(tabIds, [spaceTabSchema], { spaceTab });
    
    return tabs.slice().sort((a, b) => a.pos - b.pos);
  }
);