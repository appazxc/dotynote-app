import { uploadPostAttachments } from 'shared/actions/post/uploadPostAttachments';
import { api } from 'shared/api';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { RemoveUploadFiles, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { ThunkAction } from 'shared/types/store';

type Params = {
  parentId: string;
  files: UploadFile[];
  onPostCreated?: (postId: string) => void;
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
    try {
      const postId = await api.post<string>(`/notes/${parentId}/posts`, {});
    
      onPostCreated?.(postId);
      
      await dispatch(uploadPostAttachments({
        postId,
        files,
        removeFiles,
      }));
      
      onAttachmentsUploaded?.();
    } catch (error) {
      const parsedError = parseApiError(error);

      toaster.create({
        description: parsedError.message,
        type: 'warning',
      });
    }
  };