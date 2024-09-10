import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';

import { EntityName, entityNames } from 'shared/constants/entityNames';
import { EntityTypes } from 'shared/types/entities/entityTypes';

export type Entities = {
  [name in EntityName]: {
    [key: string]: EntityTypes[name] | void
  }
}

type UpdateEntityPayload<T extends EntityName> = { 
  type: T, 
  id: string | number, 
  data: Partial<EntityTypes[T]>
}

const initialState = Object.keys(entityNames).reduce((acc, name) => {
  acc[name] = {};
  return acc;
}, {}) as Entities;

const createEntitySlice = (entityName) => {
  return createSlice({
    name: entityName,
    initialState: {},
    extraReducers: (builder) => {
      builder
        .addCase(addEntity, (state, action) => {
          // action is inferred correctly here if using TS
        })
    },
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
              // TODO console.log('update', Object.keys(oldEntity), newEntity);
              state[entityName][entityId] = {
                ...oldEntity,
                ...newEntity,
              };
            }
          });
        });
      },
      updateEntity: <T extends EntityName>(
        state, 
        { payload }: PayloadAction<UpdateEntityPayload<T>>
      ) => {
        const { id, type, data } = payload;
  
        if (state[type][id]) {
          for (const [key, value] of Object.entries(data)) {
            if (state[type][id][key] !== value) {
              state[type][id][key] = value;
            }
          }
        }
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
}
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
            // TODO console.log('update', Object.keys(oldEntity), newEntity);
            state[entityName][entityId] = {
              ...oldEntity,
              ...newEntity,
            };
          }
        });
      });
    },
    updateEntity: <T extends EntityName>(
      state, 
      { payload }: PayloadAction<UpdateEntityPayload<T>>
    ) => {
      const { id, type, data } = payload;

      if (state[type][id]) {
        for (const [key, value] of Object.entries(data)) {
          if (state[type][id][key] !== value) {
            state[type][id][key] = value;
          }
        }
      }
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

export const { addEntities, updateEntity, addEntity, deleteEntity } = entitiesSlice.actions;

export default entitiesSlice.reducer;
