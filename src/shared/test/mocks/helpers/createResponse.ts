import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const IdSymbol = 'Id';

const isEntity = (stub) => {
  return isObject(stub) ? !!(stub as Keyable).id : false;
};

const getEntities = (acc, entityName, stub) => {
  const iter = (acc, entityName, stubs) => {
    if (isEntity(stubs)) {
      const newEntity: Keyable = {};

      Object.entries(stubs).forEach(([key, value]) => {
        if (isEntity(value)) {
          newEntity[key + IdSymbol] = iter(acc, key, value);
          return;
        }

        if (isArray(value) && isEntity(value[0])) {
          newEntity[key] = value.map(entity => iter(acc, key.slice(0, -1), entity));
          return;
        }

        newEntity[key] = value;
      });

      acc[entityName] = acc[entityName] || {};
      acc[entityName][newEntity.id] = newEntity;

      return newEntity.id;
    }


    if (isArray(stubs) && isEntity(stubs[0])) {
      return stubs.map(entity => iter(acc, entityName, entity));
    }

    return stubs;
  };

  return iter(acc, entityName, stub);
};

export const createResponse = (entityName, stub) => {
  const result = {};

  const data = getEntities(result, entityName, stub);

  return {
    data,
    entities: result
  };
};