import { uploadFiles } from 'shared/modules/fileUpload/actions/uploadFiles';
import { RemoveFilesType } from 'shared/modules/fileUpload/FileUploadProvider';
import { UploadEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { postSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  postId: number,
  files: UploadEntity[],
  onPostsCreated?: (postIds: number[]) => void,
  onAttachmentsUploaded?: () => void,
  removeFiles: RemoveFilesType,
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
        zone: 'note',
        zoneId: post.note.id,
      }));
    });

    await dispatch(uploadFiles(files, removeFiles));
  };