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

  emitter.once(`cancelFileUpload:${entity.fileId}`, () => {
    controller.abort();
  });

  if (entity.type === 'image') {
    await dispatch(uploadNoteImage(noteId, file, signal));
    return;
  }

  if (entity.type === 'file') {
    await dispatch(uploadNoteFile(noteId, file, signal));
    return;
  }

  if (entity.type === 'audio') {
    await dispatch(uploadNoteAudio(noteId, file, signal));
    return;
  }

  console.log(`Not implemented file upload. Type: ${entity.type}}`);
};

export const uploadNoteImage = (noteId: number, file: UploadFile, signal?: AbortSignal): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('noteId', String(noteId));

    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        '/upload/images', 
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
    formData.append('noteId', String(noteId));
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        '/upload/files', 
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
    formData.append('noteId', String(noteId));
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'pending' }));

      const realId = await api.post<string>(
        '/upload/audio', 
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
