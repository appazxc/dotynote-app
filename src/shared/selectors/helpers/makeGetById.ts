import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const makeGetById = (entityName) => {
  return createSelector([
    (state: AppState) => state.entities,
    (_, id) => id,
  ],
  (entities, id) => {
    return entities[entityName][id] || null;
  });
};