import { api } from 'shared/api';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { ThunkAction } from 'shared/types/store';
import { emitter } from 'shared/util/emitter';

type UploadNoteFilesParams = {
  noteId: number,
  files: UploadFile[],
  removeFiles: (fileIds: string[]) => void
}

export const uploadNoteFiles = ({ 
  noteId,
  files, 
  removeFiles,
}: UploadNoteFilesParams): ThunkAction => async (dispatch) => {
  files.forEach(({ fileId }) => {
    dispatch(updateFile({
      fileId,
      noteId,
    }));
  });

  for await (const file of files) {
    await dispatch(uploadFile(noteId, file));
  }

  await queryClient.fetchQuery({ ...options.notes.load(Number(noteId)), staleTime: 0 });
  
  removeFiles(files.map(({ fileId }) => fileId));
};

export const uploadFile = (noteId: number, file: UploadFile): ThunkAction => async (dispatch, getState) => {
  const entity = selectUploadFileEntity(getState(), file.fileId);

  if (!entity || entity.status === 'canceled') {
    return;
  }

  const controller = new AbortController();
  const signal = controller.signal;
  const eventName = `cancelFileUpload:${entity.fileId}`;

  emitter.once(eventName, () => {
    controller.abort();
  });

  switch(entity.type) {
  case 'image':
    await dispatch(uploadNoteImage(noteId, file, signal));
    break;
  case 'file':
    await dispatch(uploadNoteFile(noteId, file, signal));
    break;
  case 'audio':
    await dispatch(uploadNoteAudio(noteId, file, signal));
    break;
  default:
    console.log(`Not implemented file upload. Type: ${entity.type}}`);
  }

  emitter.removeAllListeners(eventName);
};

export const uploadNoteImage = (noteId: number, file: UploadFile, signal?: AbortSignal): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);

    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        `/notes/${noteId}/images`, 
        formData,
        { 
          signal,
          onUploadProgress: (event) => {
            dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
          }, 
        });

      dispatch(updateFile({ fileId: file.fileId, status: 'complete', realId }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };

export const uploadNoteFile = (noteId: number, file: UploadFile, signal?: AbortSignal): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        `/notes/${noteId}/files`, 
        formData,
        { 
          signal,
          onUploadProgress: (event) => {
            dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
          }, 
        });

      dispatch(updateFile({ fileId: file.fileId, status: 'complete', realId }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };

export const uploadNoteAudio = (noteId: number, file: UploadFile, signal?: AbortSignal): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        `/notes/${noteId}/audio`, 
        formData,
        { 
          signal,
          onUploadProgress: (event) => {
            dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
          }, 
        });

      dispatch(updateFile({ fileId: file.fileId, status: 'complete', realId }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };
