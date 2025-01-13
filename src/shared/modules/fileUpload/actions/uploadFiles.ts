import { api } from 'shared/api';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/selectors';
import { updateFile, UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { ThunkAction } from 'shared/types/store';

export const uploadFiles = (
  files: UploadFile[], 
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

  if (entity.type === 'file' && entity.zone === 'note') {
    await dispatch(uploadNoteFile(file, entity));
    return;
  }

  console.log(`Not implemented file upload. Type: ${entity.type}, zone: ${entity.zone}`);
};

export const uploadNoteImage = (file: UploadFile, entity: UploadFileEntity): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('noteId', String(entity.zoneId));
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        '/upload/images', 
        formData,
        { 
          onUploadProgress: (event) => {
            dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
          }, 
        });

      dispatch(updateFile({ fileId: file.fileId, status: 'complete', realId }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };

export const uploadNoteFile = (file: UploadFile, entity: UploadFileEntity): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('noteId', String(entity.zoneId));
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        '/upload/files', 
        formData,
        { 
          onUploadProgress: (event) => {
            console.log('event.progress', event.progress);
            dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
          }, 
        });

      dispatch(updateFile({ fileId: file.fileId, status: 'complete', realId }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };
