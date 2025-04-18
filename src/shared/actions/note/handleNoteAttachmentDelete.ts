import { deleteNotes } from 'shared/actions/note/deleteNotes';
import { getIsNoteEmpty } from 'shared/selectors/note/getIsNoteEmpty';
import { selectUser } from 'shared/selectors/user/selectUser';
import { ThunkAction } from 'shared/types/store';

export const handleNoteAttachmentDelete = (noteId: number): ThunkAction => 
  async (dispatch, getState) => {
    const isEmpty = getIsNoteEmpty(getState(), noteId);
    const user = selectUser(getState());
    
    if (isEmpty && user?.settings?.deleteEmptyNotes) {
      dispatch(deleteNotes([noteId]));
    }
  };
