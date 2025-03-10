import { InfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { TQueryFnData } from 'shared/types/query';

export const pasteIdsInConretePlace = ({ ids, concretePostId, place }) => (oldData, queryKey) => {
  if (!oldData) {
    return oldData;
  }
    
  const FILTERS_INDEX = 2;
  const newIds = [...ids];
  const descSort = queryKey[FILTERS_INDEX]?.sort === 'desc';
    
  return {
    ...oldData,
    pages: oldData.pages.map((page) => {
      const index = page.items.indexOf(concretePostId);

      if (index === -1) {
        return page;
      }

      const newItems = [...page.items];
      const isTopPlace = place === 'top';
      console.log('descSort', descSort, isTopPlace);
      const pasteIndex = isTopPlace ? index : index + 1; 
      const needReverse = isTopPlace;

      if (needReverse) {
        newIds.reverse();
      }

      newItems.splice(pasteIndex, 0, ...newIds);

      return {
        ...page,
        items: newItems,
      };
    }),
  };
};

export const updateInfinityQuery = <T extends TQueryFnData>(
  queryKey: InfinityPostsQueryKey | undefined, 
  updater: (oldData: T | undefined, queryKey: InfinityPostsQueryKey) => T | undefined
) => {
  if (!queryKey) {
    return;
  }

  queryClient.setQueryData<T>(queryKey, (oldData) => updater(oldData, queryKey));
};