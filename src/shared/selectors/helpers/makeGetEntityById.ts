import { createSelector } from '@reduxjs/toolkit';
import { denormalize } from 'normalizr';

import { ApiEntityTypes } from 'shared/types/entities/entityTypes';
import { AppState } from 'shared/types/store';

const getEntitiesKeys = (schema) => {
  const keys: string[] = [];

  keys.push(schema.key);

  const iter = (schema) => {
    if (schema.key) {
      keys.push(schema.key);
    }

    if (schema.schema) {
      Object.values(schema.schema).forEach(s => {
        if (Array.isArray(s)) {
          s.forEach(iter);
          return;
        }

        iter(s);
      });
    }
  };

  iter(schema);

  return [...new Set(keys)];
};

const transformToEntities = (keys, entitiesList) => {
  return keys.reduce((acc, key, index) => {
    acc[key] = entitiesList[index];
    return acc;
  }, {});
};

type EntitySelector = (state: AppState, id?: string | number | null) => ApiEntityTypes | null

export const makeGetEntityById = (schema) => {
  const keys = getEntitiesKeys(schema);

  return createSelector([
    (_, id) => id,
    ...keys.map((key) => (state: AppState) => {
      return state.entities[key];
    }),
  ] as EntitySelector[],
  (id, ...entitiesList) => {
    const entities = transformToEntities(keys, entitiesList);

    return denormalize(id, schema, entities);
  });
};