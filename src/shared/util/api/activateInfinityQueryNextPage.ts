import { QueryKey } from '@tanstack/react-query';

import { queryClient } from 'shared/api/queryClient';
import { DEFAULT_PAGE_SIZE } from 'shared/constants/requests';
import { InfinityAllTypeQueryKey } from 'shared/modules/noteTab/components/AllTypeList/AllTypeList';
import { InfinityStickTypeQueryKey } from 'shared/modules/noteTab/components/StickTypeList';
import { TQueryFnData } from 'shared/types/query';
import { restorePagesStructure } from 'shared/util/api/restorePagesStructure';

export const activateInfinityQueryNextPage = (key?: QueryKey) => {
  if (!key) {
    return;
  }

  const queriesData = queryClient.getQueriesData<TQueryFnData>({ queryKey: key });
  queriesData.forEach((data) => {
    const queryKey = data[0] as (InfinityStickTypeQueryKey | InfinityAllTypeQueryKey);
    const queryData = data[1];

    if (!queryData) {
      return;
    }

    const internalIndex = 4;
    const isInternal = !!queryKey[internalIndex];
    const isEmpty = queryData.pages.length === 1 
      && queryData.pages[0].items.length === 0;

    if (isEmpty) {
      queryClient.resetQueries({ queryKey });
      return;
    }

    if (isInternal) {
      queryClient.invalidateQueries({ queryKey });
      return;
    }

    queryClient.setQueryData<TQueryFnData>(queryKey, (oldData) => {
      if (!oldData) {
        return oldData;
      }
      
      const filtersIndex = 3;
      const descSort = (queryKey[filtersIndex]?.sort || 'desc') === 'desc';
      const pageSize = Number(queryKey[filtersIndex]?.pageSize) || DEFAULT_PAGE_SIZE;
      
      return {
        ...oldData,
        pages: restorePagesStructure(oldData.pages, pageSize).map((page) => ({
          ...page,
          ...descSort ? {
            hasNextPage: true,
          } : {
            hasPrevPage: true,
          },
        })),
      };
    });
  });
};