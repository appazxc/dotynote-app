import { entityNames } from "shared/constants/entityNames";

const entityNameAlias = {
  'sideNote': entityNames.note,
};

export const propToEntityMap = (prop: string): string => {
  return entityNameAlias[prop] || prop;
};