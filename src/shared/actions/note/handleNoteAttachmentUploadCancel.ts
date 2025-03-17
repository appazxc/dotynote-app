import { deleteNotes } from 'shared/actions/note/deleteNotes';
import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { GetUploadFiles } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadEntities } from 'shared/modules/fileUpload/fileUploadSelectors';
import { getIsNoteEmpty } from 'shared/selectors/note/getIsNoteEmpty';
import { ThunkAction } from 'shared/types/store';
import { wait } from 'shared/util/wait';

export const handleNoteAttachmentUploadCancel = (noteId: number, getFiles: GetUploadFiles): ThunkAction => 
  async (dispatch, getState) => {
    await wait(1); // wait for the files to be removed
    const files = getFiles();

    const uploadFiles = selectUploadEntities(getState(), { 
      files, 
      noteId,
    });

    console.log('uploadFiles', uploadFiles.length);

    const isEmpty = getIsNoteEmpty(getState(), noteId);
    console.log('isEmpty', isEmpty);

    // if (isEmpty) {
    //   dispatch(deleteNotes([noteId]));
    // }
  };
