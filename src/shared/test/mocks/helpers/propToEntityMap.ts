import { entityNames } from "shared/constants/entityNames";

const entityNameAlias = {
  'mainNote': entityNames.note,
};

export const propToEntityMap = (prop: string): string => {
  return entityNameAlias[prop] || prop;
};