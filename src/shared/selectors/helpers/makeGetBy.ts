import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const makeGetById = (entityName) => {
  return createSelector([
    (state: AppState) => {
      return state.entities[entityName];
    },
    (_, id) => id,
  ], 
  (entities, id) => {
    return entities[id] || null;
  });
};