import { createSelector } from '@reduxjs/toolkit';
import { denormalize, Schema } from 'normalizr';

import { EMPTY_ARRAY } from 'shared/constants/common';

export const makeGetEntitiesById = (schema: Schema) => {
  return createSelector(
    [
      state => state.entities,
      (_, ids) => ids || EMPTY_ARRAY,
    ],
    (entities, ids) => {
      return denormalize(ids, [schema], entities);
    });
};
