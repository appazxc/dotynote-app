import { queryOptions } from "@tanstack/react-query";

import { hour } from "shared/constants/time";

import { entityApi } from "../entityApi";

type Filters = {
  spaceId?: string;
};

export const list = (filters: Filters) => {
  return queryOptions({
    queryKey: ["spaceTabs", filters],
    queryFn: () => {
      return entityApi.spaceTab.loadList({ filters });
    },
    staleTime: hour,
  });
};
