import { queryOptions } from "@tanstack/react-query";
import { entityApi } from "../entityApi";

export const one = (id: string) => {
  return queryOptions({
    queryKey: ['space', id],
    queryFn: () => {
      return entityApi.space.load(id);
    },
  });
};

export const list = (filters) => {
  return queryOptions({
    queryKey: ['spaces', filters],
    queryFn: () => {
      return entityApi.space.loadList({ filters });
    },
  });
};