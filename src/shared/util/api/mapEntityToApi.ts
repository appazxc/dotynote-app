import { omit } from "lodash";

const omitedProps = ["id", "isFake"];

export const mapEntityToApi = (entity: any) => {
  return omit(entity, omitedProps);
};
