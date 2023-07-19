import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EntityName, entityNames } from 'shared/constants/entityNames';
import { EntityTypes } from 'shared/types/entities/entityTypes';
import isEqual from 'lodash/isEqual';

export type Entities = {
  [name in EntityName]: {
    [key: string]: EntityTypes[name] | void
  }
}

const initialState: Entities = Object.keys(entityNames).reduce((acc, name) => {
  acc[name] = {};
  return acc;
}, {}) as Entities;

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    addEntities: (state, { payload }: PayloadAction<Entities>) => {
      Object.keys(payload).forEach(entityName => {
        Object.keys(payload[entityName]).forEach(entityId => {
          if (!state[entityName]) {
            state[entityName] = {};
          }

          const oldEntity = state[entityName][entityId];
          const newEntity = payload[entityName][entityId];

          if (!oldEntity) {
            state[entityName][entityId] = newEntity;
            return;
          }

          if (!isEqual(oldEntity, newEntity)) {
            state[entityName][entityId] = {
              ...oldEntity,
              ...newEntity,
            };
          }
        });
      });
    },
  },
});

export const { addEntities } = entitiesSlice.actions;

export default entitiesSlice.reducer;
