import { EntityName } from 'shared/constants/entityNames';
import { Entities } from 'shared/store/slices/entitiesSlice';
import { EntityTypes } from 'shared/types/entities/entityTypes';

export const fillEntities = (entities: { [key in EntityName]?: EntityTypes[key][]}): Entities => {
  const result = {} as Entities;

  Object.entries(entities).forEach(([name, entitiesArray]) => {
    result[name] = result[name] ? result[name] : {};

    entitiesArray.forEach(entity => {
      result[name][entity.id] = entity;
    });
  });

  return result;
};
