import { EntityName } from 'shared/constants/entityTypes';
import { Entities } from 'shared/store/slices/entitiesSlice';
import { ApiEntityTypes } from 'shared/types/entities/entityTypes';

export const fillEntities = (entities: { [key in EntityName]?: ApiEntityTypes[key][]}): Entities => {
  const result = {} as Entities;

  Object.entries(entities).forEach(([name, entitiesArray]) => {
    result[name] = result[name] ? result[name] : {};

    entitiesArray.forEach(entity => {
      result[name][entity.id] = entity;
    });
  });

  return result;
};
