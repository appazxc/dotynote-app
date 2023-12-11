import { createSelector } from '@reduxjs/toolkit';

export const makeGetSelectEntities = (entityName) => {
  return createSelector(
    [
      state => state.entities[entityName],
      (_, ids) => ids,
    ],
    (entities, ids) => {
      return ids.map(id => entities[id]);
    });
};
