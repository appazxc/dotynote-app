import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';

import { EntityName, entityTypes } from 'shared/constants/entityTypes';
import { ApiEntityTypes } from 'shared/types/entities/entityTypes';

export type Entities = {
  [name in EntityName]: {
    [key: string]: ApiEntityTypes[name]
  }
}

type UpdateEntityPayload<T extends EntityName> = { 
  type: T, 
  id: string | number, 
  data: Partial<ApiEntityTypes[T]>
}

const initialState = Object.keys(entityTypes).reduce((acc, name) => {
  acc[name] = {};
  return acc;
}, {}) as Entities;

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    addEntity: (state, { payload }: PayloadAction<{ entityName: EntityName, data: any }>) => {
      const { entityName, data } = payload;
      const { id } = data;
      if (!state[entityName]) {
        state[entityName] = {};
      }

      const oldEntity = state[entityName][id];
      const newEntity = data;

      if (!oldEntity) {
        state[entityName][id] = newEntity;
        return;
      }

      if (!isEqual(oldEntity, newEntity)) {
        state[entityName][id] = {
          ...oldEntity,
          ...newEntity,
        };
      }
    },
    addEntities: (state, { payload }: PayloadAction<Entities>) => {
      Object.keys(payload).forEach((entityName) => {
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

          updateEntityLogic(state, {
            type: 'entities/updateEntity',
            payload: { id: entityId, type: entityName as EntityName, data: newEntity },
          });
        });
      });
    },
    updateEntity: <T extends EntityName>(
      state, 
      action: PayloadAction<UpdateEntityPayload<T>>
    ) => {
      updateEntityLogic(state, action);
    },
    deleteEntity: (
      state, 
      { payload }: PayloadAction<{ id: string | number, type: EntityName }>
    ) => {
      const { id, type } = payload;

      delete state[type][id];
    },
  },
});

type UpdateEntityLogic<T extends EntityName = EntityName> = 
  CaseReducer<Entities, PayloadAction<UpdateEntityPayload<T>>>;

const updateEntityLogic: UpdateEntityLogic = (state, { payload }) => {
  const { id, type, data } = payload;

  if (state[type][id]) {
    for (const [key, value] of Object.entries(data)) {
      if (!isEqual(state[type][id][key], value)) {
        state[type][id][key] = value;
      }
    }
  }
};

export const { addEntities, updateEntity, addEntity, deleteEntity } = entitiesSlice.actions;

export default entitiesSlice.reducer;
