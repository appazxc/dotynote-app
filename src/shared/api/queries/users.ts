import { queryOptions } from "@tanstack/react-query";

import { entityApi } from "../entityApi";

export const me = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () => {
      return entityApi.user.loadMe();
    },
  });
};