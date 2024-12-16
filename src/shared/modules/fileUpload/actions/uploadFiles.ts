import { api } from 'shared/api';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { FilesType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/selectors';
import { updateFile, UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

export const uploadFiles = (
  files: FilesType, 
  removeFiles: (fileIds: string[]) => void
): ThunkAction => async (dispatch, getState) => {
  for await (const file of files) {
    await dispatch(uploadFile(file));
  }

  const entity = selectUploadFileEntity(getState(), files[0].fileId);

  if (entity && entity.zone === 'note') {
    await queryClient.fetchQuery({ ...options.notes.load(Number(entity.zoneId)), staleTime: 0 });
  }

  removeFiles(files.map(({ fileId }) => fileId));
};

export const uploadFile = (file: UploadFile): ThunkAction => async (dispatch, getState) => {
  const entity = selectUploadFileEntity(getState(), file.fileId);

  if (!entity || entity.status === 'canceled') {
    return;
  }
  
  if (entity.type === 'image' && entity.zone === 'note') {
    await dispatch(uploadNoteImage(file, entity));
    return;
  }

  invariant(false, 'Not implemented');
};

export const uploadNoteImage = (file: UploadFile, entity: UploadFileEntity): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('noteId', String(entity.zoneId));
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      await api.post(
        '/upload/images', 
        formData,
        { 
          onUploadProgress: (event) => {
            dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
          }, 
        });

      dispatch(updateFile({ fileId: file.fileId, status: 'complete' }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };
