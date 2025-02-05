import axios from 'axios';
import throttle from 'lodash/throttle';

import { api } from 'shared/api';
import { provideJwt } from 'shared/api/apiFactory';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { getBaseApi } from 'shared/helpers/api/getBaseApi';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { ThunkAction } from 'shared/types/store';
import { connectSSE } from 'shared/util/connectSse';
import { emitter } from 'shared/util/emitter';

const updateFileUploadStatus = throttle((id: string, progress: number) => {
  api.patch(`/upload/${id}`, { progress });
}, 5000, { trailing: false });

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
    await dispatch(uploadAttachment(noteId, file));
  }

  await queryClient.fetchQuery({ ...options.notes.load(Number(noteId)), staleTime: 0 });
  
  removeFiles(files.map(({ fileId }) => fileId));
};

export const uploadAttachment = (noteId: number, file: UploadFile): ThunkAction => async (dispatch, getState) => {
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
      dispatch(updateFile({ fileId: file.fileId, status: 'uploading' }));

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
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'uploading' }));
      
      const { url, id } = await api.post<{ url: string, id: string }>(
        '/upload', 
        {
          noteId,
          filename: file.file.name,
          size: file.file.size,
          type: 'file',
        });

      dispatch(updateFile({ 
        fileId: file.fileId, 
        tempId: id,
      }));

      await axios.put(
        url, 
        file.file,
        { 
          signal,
          onUploadProgress: (event) => {
            const progress = Math.floor((event.progress || 0) * 100);

            dispatch(updateFile({ 
              fileId: file.fileId, 
              progress,
            }));

            updateFileUploadStatus(id, progress);
          }, 
        });

      await api.post(`/upload/${id}/uploaded`, {});
      
      await dispatch(connectSSE<{ 
        progress: number,
        status: string,
        realId: string | null
       }>({
         url: `${getBaseApi()}/upload/status/${id}`,
         onClose: () => {
           console.log('closed' );
         },
         onMessage: (data, close) => {
           dispatch(updateFile({
             fileId: file.fileId, 
             progress: data.progress,
             status: data.status === 'complete' ? 'complete' : 'processing',
             realId: data.realId,
           }));

           if (data.status === 'complete') {
             close();
           }
         },
       }));
    } catch(error) {
      dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };

// export const uploadNoteFile = (noteId: number, file: UploadFile, signal?: AbortSignal): ThunkAction => 
//   async (dispatch) => {
//     const formData = new FormData();
//     formData.append('file', file.file);
    
//     try {
//       dispatch(updateFile({ fileId: file.fileId, status: 'uploading' }));

//       const realId = await api.post<string>(
//         `/notes/${noteId}/files`, 
//         formData,
//         { 
//           signal,
//           onUploadProgress: (event) => {
//             dispatch(updateFile({ fileId: file.fileId, progress: Math.min((event.progress || 0) * 100, 90) }));
//           }, 
//         });

//       dispatch(updateFile({ fileId: file.fileId, status: 'complete', realId }));
//     } catch(error) {
//       dispatch(updateFile({ fileId: file.fileId, status: 'error', error: parseApiError(error).message }));
//     }
//   };

export const uploadNoteAudio = (noteId: number, file: UploadFile, signal?: AbortSignal): ThunkAction => 
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file.file);
    
    try {
      dispatch(updateFile({ fileId: file.fileId, status: 'uploading' }));

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
