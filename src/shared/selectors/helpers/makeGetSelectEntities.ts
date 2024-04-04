import { createSelector } from '@reduxjs/toolkit';

import { EMPTY_ARRAY } from 'shared/constants/common';

export const makeGetSelectEntities = (entityName) => {
  return createSelector(
    [
      state => state.entities[entityName],
      (_, ids) => ids || EMPTY_ARRAY,
    ],
    (entities, ids) => {
      return ids.map(id => entities[id]);
    });
};
