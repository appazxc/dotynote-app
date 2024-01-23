import { queryOptions } from "@tanstack/react-query";

import { entityApi } from "../entityApi";
import { queries } from "../queries";
import { queryClient } from "../queryClient";

// need for show tab titles
export const tabNotes = (spaceId: string) => {
  return queryOptions({
    queryKey: ["tabNotes", spaceId],
    queryFn: async () => {
      const tabIds = await queryClient.fetchQuery(queries.spaceTabs.list({ spaceId }));
      return entityApi.note.loadTabNotes(tabIds);
    },
  });
};
