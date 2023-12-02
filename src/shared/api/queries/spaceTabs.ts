import { queryOptions } from "@tanstack/react-query";
import { entityApi } from "../entityApi";

export const prepared = () => {
  return queryOptions({
    queryKey: ['spaceTabsPrepared'],
    queryFn: () => {
      return entityApi.spaceTab.loadPrepared();
    },
  });
};