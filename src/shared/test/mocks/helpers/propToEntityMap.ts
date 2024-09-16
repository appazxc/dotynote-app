import { entityTypes } from 'shared/constants/entityTypes';

const entityNameAlias = {
  'mainNote': entityTypes.note,
};

export const propToEntityMap = (prop: string): string => {
  return entityNameAlias[prop] || prop;
};