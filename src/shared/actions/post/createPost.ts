import { uploadPostAttachments } from 'shared/actions/post/uploadPostAttachments';
import { api } from 'shared/api';
import { RemoveUploadFiles, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { ThunkAction } from 'shared/types/store';

type Params = {
  parentId: number;
  files: UploadFile[];
  onPostCreated?: (postId: number) => void;
  onAttachmentsUploaded?: () => void;
  removeFiles: RemoveUploadFiles;
}

export const createPost = (params: Params): ThunkAction => 
  async (dispatch) => {
    const { 
      parentId,
      files,
      removeFiles,
      onPostCreated,
      onAttachmentsUploaded,
    } = params;
    const postId = await api.post<number>(`/notes/${parentId}/posts`, {});
    
    onPostCreated?.(postId);
    
    await dispatch(uploadPostAttachments({
      postId,
      files,
      removeFiles,
    }));
    
    onAttachmentsUploaded?.();
  };