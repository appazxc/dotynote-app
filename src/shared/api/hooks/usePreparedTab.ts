import React from "react";

import { useQuery } from "@tanstack/react-query";

import { entityApi } from "../entityApi";
import { queries } from "../queries";

export const usePreparedTab = () => {
  const { data: preparedTabs, isFetching, refetch } = useQuery(queries.spaceTabs.prepared());

  React.useEffect(() => {
    const refetchPrepared = async () => {
      if (isFetching || !preparedTabs || preparedTabs.length) {
        return;
      }

      await entityApi.spaceTab.createPrepared();
      await refetch();
    };

    refetchPrepared();
  }, [isFetching, preparedTabs, refetch]);
};