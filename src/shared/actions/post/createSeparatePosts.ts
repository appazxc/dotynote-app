import { uploadPostAttachments } from 'shared/actions/post/uploadPostAttachments';
import { api } from 'shared/api';
import { RemoveFilesType } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { noteSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  parentId: number,
  files: UploadEntity[],
  onPostsCreated?: (postIds: number[]) => void,
  onAttachmentsUploaded?: () => void,
  removeFiles: RemoveFilesType,
}

export const createSeparatePosts = (params: Params): ThunkAction => 
  async (dispatch, getState) => {
    const { 
      parentId,
      files,
      removeFiles,
      onPostsCreated,
      onAttachmentsUploaded,
    } = params;

    const postsData = files.map(() => ({}));
    
    const postIds = await api.post<number[]>(`/notes/${parentId}/multi-posts`, postsData);
    
    onPostsCreated?.(postIds);

    const parent = noteSelector.getEntityById(getState(), parentId);

    invariant(parent, 'Missing parent note');
     
    const orderedFiles = parent.postsSettings?.sort === 'desc' ? files.slice().reverse() : files;

    await Promise.all(postIds.map((postId, index) => {
      return dispatch(uploadPostAttachments({
        postId,
        files: [orderedFiles[index]],
        removeFiles,
      }));
    }));

    onAttachmentsUploaded?.();
  };