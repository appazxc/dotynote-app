import { selectNotesWithAllTypeList } from 'shared/selectors/note/selectNotesWithAllTypeList';
import { selectUser } from 'shared/selectors/user/selectUser';
import { AppState } from 'shared/types/store';

export const selectUserNotesWithAllTypeList = (state: AppState) => {
  const notes = selectNotesWithAllTypeList(state);
  const user = selectUser(state);

  return notes.filter((note) => note.authorId === user?.id);
};
