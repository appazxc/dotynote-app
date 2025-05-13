import { queryClient } from 'shared/api/queryClient';
import { InfinityStickTypeQueryKey } from 'shared/modules/noteTab/components/StickTypeList';
import { TQueryFnData } from 'shared/types/query';

export const pasteIdsInConretePlace = ({ ids, concretePostId, place }) => (oldData) => {
  if (!oldData) {
    return oldData;
  }
  
  const newIds = [...ids];
    
  return {
    ...oldData,
    pages: oldData.pages.map((page) => {
      const index = page.items.indexOf(concretePostId);

      if (index === -1) {
        return page;
      }

      const newItems = [...page.items];
      const isTopPlace = place === 'top';
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
  queryKey: InfinityStickTypeQueryKey | undefined, 
  updater: (oldData: T | undefined, queryKey: InfinityStickTypeQueryKey) => T | undefined
) => {
  if (!queryKey) {
    return;
  }

  queryClient.setQueryData<T>(queryKey, (oldData) => updater(oldData, queryKey));
};