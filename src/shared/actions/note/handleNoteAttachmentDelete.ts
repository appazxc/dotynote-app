import { deleteNotes } from 'shared/actions/note/deleteNotes';
import { selectNoteFullness } from 'shared/selectors/note/selectNoteFullness';
import { selectUser } from 'shared/selectors/user/selectUser';
import { ThunkAction } from 'shared/types/store';

export const handleNoteAttachmentDelete = (noteId: number): ThunkAction => 
  async (dispatch, getState) => {
    const { isNoteEmpty, isFilesUploading } = selectNoteFullness(getState(), noteId);
    const user = selectUser(getState());
    
    if (isNoteEmpty && !isFilesUploading && user?.settings?.deleteEmptyNotes) {
      dispatch(deleteNotes([noteId]));
    }
  };
