import { getInfinityAllTypeQueryKey } from 'shared/modules/noteTab/components/AllTypeList/AllTypeList';
import { selectUserNotesWithAllTypeList } from 'shared/selectors/note/selectUserNotesWithAllTypeList';
import { ThunkAction } from 'shared/types/store';
import { activateInfinityQueryNextPage } from 'shared/util/api/activateInfinityQueryNextPage';

export const activateUserAllTypeQueriesNextPage = (): ThunkAction => {
  return (_dispatch, getState) => {
    const notes = selectUserNotesWithAllTypeList(getState());

    notes.forEach((note) => {
      activateInfinityQueryNextPage(
        getInfinityAllTypeQueryKey(note.id).slice(0, 4) // remove nested level for query all keys
      );
    });
  };
};
