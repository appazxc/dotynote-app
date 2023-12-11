import { queryOptions } from "@tanstack/react-query";

import { entityApi } from "../entityApi";

// need for show tab titles
export const tabNotes = (spaceId: string) => {
  return queryOptions({
    queryKey: ['tabNotes', spaceId],
    queryFn: () => {
      return entityApi.note.loadTabNotes(spaceId);
    },
  });
};