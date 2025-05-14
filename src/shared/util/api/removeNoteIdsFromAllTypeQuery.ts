import { queryClient } from 'shared/api/queryClient';
import { DEFAULT_PAGE_SIZE } from 'shared/constants/requests';
import { 
  getInfinityAllTypeQueryKey, 
  InfinityAllTypeQueryKey,
} from 'shared/modules/noteTab/components/AllTypeList/AllTypeList';
import { selectNotesWithAllTypeList } from 'shared/selectors/note/selectNotesWithAllTypeList';
import { TQueryFnData } from 'shared/types/query';
import { ThunkAction } from 'shared/types/store';
import { restorePagesStructure } from 'shared/util/api/restorePagesStructure';
import { updateInfinityQuery } from 'shared/util/api/updateInfinityQuery';

const removeFromQuery = (parentId: string, noteIds: string[], resetEmptyQueries = true) => {
  const queriesData: {
    queryKey: InfinityAllTypeQueryKey;
    data?: TQueryFnData;
  }[] = [];

  queryClient
    .getQueriesData({ queryKey: getInfinityAllTypeQueryKey(parentId) })
    .forEach(([queryKey]) => {
      updateInfinityQuery(queryKey as InfinityAllTypeQueryKey, (oldData, queryKey) => {
        if (!oldData) {
          return oldData;
        }
        
        queriesData.push({
          queryKey,
          data: oldData,
        });

        const FILTERS_INDEX = 3;
        const filters = queryKey[FILTERS_INDEX];
        const pageSize = Number(filters?.pageSize) || DEFAULT_PAGE_SIZE;

        const newPages = oldData.pages.map((page) => {
          return {
            ...page,
            items: page.items.filter((id) => !noteIds.includes(id)),
          };
        });

        return {
          ...oldData,
          pages: restorePagesStructure(newPages, pageSize),
        };
      });
    });

  // reset queries if they are empty
  if (resetEmptyQueries) {
    queryClient
      .getQueriesData({ queryKey: getInfinityAllTypeQueryKey(parentId) })
      .forEach(([queryKey]) => {
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
      });
  }

  const revert = () => {
    queriesData.forEach(({ queryKey, data }) => {
      updateInfinityQuery(queryKey, () => {
        return data;
      });
    });
  };

  return revert;
};

export const removeNoteIdsFromAllTypeQuery = (noteIds: string[], resetEmptyQueries = true): ThunkAction => 
  (_, getState) => {
    const notesWithAllTypeList = selectNotesWithAllTypeList(getState());

    notesWithAllTypeList.forEach((note) => {
      removeFromQuery(note.id, noteIds, resetEmptyQueries);
    });

  };