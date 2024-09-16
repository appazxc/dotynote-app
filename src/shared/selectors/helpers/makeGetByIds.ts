import { createSelector } from '@reduxjs/toolkit';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { AppState } from 'shared/types/store';

export const makeGetByIds = (entityName) => {
  return createSelector([
    (state: AppState) => {
      return state.entities[entityName];
    },
    (_, ids) => ids || EMPTY_ARRAY,
  ], 
  (entities, ids) => {
    return ids.map(id => entities[id]);
  });
};