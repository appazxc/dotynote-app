import { createSelector } from '@reduxjs/toolkit';
import { denormalize } from 'normalizr';

import { AppState } from 'shared/types/store';

const getEntitiesKeys = (schema) => {
  const keys: string[] = [];

  keys.push(schema._key);

  Object.values(schema.schema).forEach((s: any) => {
    if (Array.isArray(s)) {
      keys.push((s[0] as any)._key);
      return;
    } else {
      keys.push(s._key);
    }
  });

  return keys;
};

const transformToEntities = (keys, entitiesList) => {
  return keys.reduce((acc, key, index) => {
    acc[key] = entitiesList[index];
    return acc;
  }, {});
};

export const makeGetById = (schema) => {
  const keys = getEntitiesKeys(schema);

  return createSelector([
    (_, id) => id,
    ...keys.map((key) => (state: AppState) => {
      return state.entities[key];
    }),
  ],
  (id, ...entitiesList) => {
    const entities = transformToEntities(keys, entitiesList);

    return denormalize(id, schema, entities);
  });
};