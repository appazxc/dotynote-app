import { queryClient } from 'shared/api/queryClient';
import { InfinityStickTypeQueryKey } from 'shared/modules/noteTab/components/StickTypeList';
import { TQueryFnData } from 'shared/types/query';

export const activateInfinityQueryNextPage = (queryKey?: InfinityStickTypeQueryKey) => {
  if (!queryKey) {
    return;
  }
  const queryData = queryClient.getQueryData<TQueryFnData>(queryKey);

  if (!queryData) {
    return;
  }
  
  const isEmpty = queryData.pages.length === 1 
      && queryData.pages[0].items.length === 0;

  if (isEmpty) {
    queryClient.resetQueries({ queryKey: queryKey });
    return;
  }

  queryClient.setQueryData<TQueryFnData>(queryKey, (oldData) => {
    if (!oldData) {
      return oldData;
    }

    const filtersIndex = 3;
    const descSort = (queryKey[filtersIndex]?.sort || 'desc') === 'desc';

    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        ...descSort ? {
          hasNextPage: true,
        } : {
          hasPrevPage: true,
        },
      })),
    };
  });
};