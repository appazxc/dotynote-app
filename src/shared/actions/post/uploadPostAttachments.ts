import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { RemoveFilesType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { postSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  postId: number;
  files: UploadFile[];
  onPostsCreated?: (postIds: number[]) => void;
  onAttachmentsUploaded?: () => void;
  removeFiles: RemoveFilesType;
}

export const uploadPostAttachments = (params: Params): ThunkAction => 
  async (dispatch, getState) => {
    const { 
      postId,
      files,
      removeFiles,
    } = params;

    const post = postSelector.getEntityById(getState(), postId);

    invariant(post, 'Missing post');

    // changing zone 'post' to 'note'
    files.forEach(({ fileId }) => {
      dispatch(updateFile({
        fileId,
        noteId: post.note.id,
      }));
    });

    await dispatch(uploadNoteFiles({ noteId: post.note.id, files, removeFiles }));
  };