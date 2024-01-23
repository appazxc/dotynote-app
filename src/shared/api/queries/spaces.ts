import { queryOptions } from "@tanstack/react-query";

import { entityApi } from "../entityApi";

export const userList = () => {
  return queryOptions({
    queryKey: ['userSpaces'],
    queryFn: () => {
      return entityApi.space.loadList();
    },
  });
};