import { uploadPostAttachments } from 'shared/actions/post/uploadPostAttachments';
import { api } from 'shared/api';
import { RemoveFilesType } from 'shared/modules/fileUpload/FileUploadProvider';
import { SelectFilteredFilesByTagReturn } from 'shared/modules/fileUpload/selectors';
import { postSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  parentId: number,
  files: SelectFilteredFilesByTagReturn,
  onPostCreated?: (postId: number) => void,
  onAttachmentsUploaded?: () => void,
  removeFiles: RemoveFilesType,
}

export const createPost = (params: Params): ThunkAction => 
  async (dispatch, getState) => {
    const { 
      parentId,
      files,
      removeFiles,
      onPostCreated,
      onAttachmentsUploaded,
    } = params;
    const postId = await api.post<number>(`/notes/${parentId}/posts`, {});
    
    onPostCreated?.(postId);
    
    const post = postSelector.getEntityById(getState(), postId);

    invariant(post, 'Missing post');

    dispatch(uploadPostAttachments({
      postId,
      files,
      removeFiles,
    }));
    
    onAttachmentsUploaded?.();
  };