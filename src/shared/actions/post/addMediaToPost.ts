import { uploadFiles } from 'shared/modules/fileUpload/actions/uploadFiles';
import { RemoveFilesType } from 'shared/modules/fileUpload/FileUploadProvider';
import { SelectFilteredFilesByTagReturn } from 'shared/modules/fileUpload/selectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { postSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';

export const addMediaToPost = (
  postId: number, 
  files: SelectFilteredFilesByTagReturn, 
  removeFiles: RemoveFilesType
): ThunkAction => async (dispatch, getState) => {
  const post = postSelector.getEntityById(getState(), postId);
  
  if (!post) {
    return;
  }
  
  files.forEach(({ fileId }) => {
    dispatch(updateFile({
      fileId,
      zone: 'note',
      zoneId: post.note.id,
    }));
  });

  dispatch(uploadFiles(files, removeFiles));
};