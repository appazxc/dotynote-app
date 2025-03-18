import { deleteNotes } from 'shared/actions/note/deleteNotes';
import { selectNoteUploadingFiles } from 'shared/modules/fileUpload/fileUploadSelectors';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { getIsNoteEmpty } from 'shared/selectors/note/getIsNoteEmpty';
import { ThunkAction } from 'shared/types/store';

export const handleNoteAttachmentUploadCancel = (noteId: number): ThunkAction => 
  async (dispatch, getState) => {
    const uploadFiles = selectNoteUploadingFiles(getState(), noteId);
    const isEmpty = getIsNoteEmpty(getState(), noteId);
    const user = selectUser(getState());
    
    if (!uploadFiles.length && isEmpty && user?.settings?.deleteEmptyNotes) {
      dispatch(deleteNotes([noteId]));
    }
  };
