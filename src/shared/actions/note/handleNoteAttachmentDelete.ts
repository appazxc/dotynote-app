import { deleteNotes } from 'shared/actions/note/deleteNotes';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { getIsNoteEmpty } from 'shared/selectors/note/getIsNoteEmpty';
import { ThunkAction } from 'shared/types/store';

export const handleNoteAttachmentDelete = (noteId: number): ThunkAction => 
  async (dispatch, getState) => {
    const isEmpty = getIsNoteEmpty(getState(), noteId);
    const user = selectUser(getState());
    
    if (isEmpty && user?.settings?.deleteEmptyNotes) {
      dispatch(deleteNotes([noteId]));
    }
  };
