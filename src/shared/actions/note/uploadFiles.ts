import axios from 'axios';
import throttle from 'lodash/throttle';

import { handleNoteAttachmentUploadCancel } from 'shared/actions/note/handleNoteAttachmentUploadCancel';
import { api } from 'shared/api';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { getBaseApi } from 'shared/helpers/api/getBaseApi';
import { RemoveUploadFiles, UploadFile, UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { noteSelector } from 'shared/selectors/entities';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { connectSSE } from 'shared/util/connectSse';
import { emitter } from 'shared/util/emitter';

const updateFileUploadStatus = throttle((id: string, progress: number) => {
  api.patch(`/upload/${id}`, { progress });
}, 5000, { trailing: false });

type UploadNoteFilesParams = {
  noteId: number;
  files: UploadFile[];
  removeFiles: RemoveUploadFiles;
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

  for await (const uploadFile of files) {
    await new Promise((resolve) => {
      dispatch(uploadAttachment({ 
        uploadFile, 
        removeFiles,
        unlockNextStep: () => resolve(true),
      }));
    });
  }
};

type UploadAttachmentParams = {
  uploadFile: UploadFile;
  removeFiles: RemoveUploadFiles;
  unlockNextStep?: () => void;
  pos?: number;
}

export const uploadAttachment = (params: UploadAttachmentParams): ThunkAction => async (dispatch, getState) => {
  const { uploadFile, unlockNextStep, removeFiles, pos } = params;
  const entity = selectUploadFileEntity(getState(), uploadFile.fileId);

  if (!entity || entity.status === 'canceled' || !entity.noteId) {
    return;
  }

  const { noteId } = entity;
  const controller = new AbortController();
  const signal = controller.signal;
  const eventName = `cancelFileUpload:${entity.fileId}`;

  emitter.once(eventName, async () => {
    const uploadFile = selectUploadFileEntity(getState(), entity.fileId);

    if (!uploadFile) {
      return;
    }

    const onFilesRemove = () => {
      dispatch(handleNoteAttachmentUploadCancel(noteId));
    };

    if (uploadFile.status === 'uploading') {
      controller.abort();
    }

    if (uploadFile.status === 'processing' && uploadFile.tempId) {
      await api.post(`/upload/${uploadFile.tempId}/cancel`, {});
    }

    removeFiles([uploadFile.fileId], onFilesRemove);
  });

  switch(entity.type) {
  case 'file':
  case 'audio':
  case 'image':
  case 'video':
    await dispatch(uploadAttachmentByType({ 
      type: entity.type, 
      noteId,
      uploadFile,
      signal,
      unlockNextStep,
      removeFiles,
      pos,
    }));
    break;
  default:
    console.log(`Not implemented file upload. Type: ${entity.type}}`);
  }

  emitter.removeAllListeners(eventName);
};

type UploadAttachmentByTypeBaseParams = UploadAttachmentByTypeParams & {
  tempUploadPath: string;
  getUploadConfirmPath: (id: string) => string;
  onComplete?: () => void;
  onCancel?: () => void;
}

export const uploadAttachmentByTypeBase = (params: UploadAttachmentByTypeBaseParams): ThunkAction => 
  async (dispatch) => {
    const {   
      type, 
      noteId, 
      uploadFile, 
      signal,
      unlockNextStep,
      tempUploadPath,
      getUploadConfirmPath,
      onComplete,
      onCancel,
      pos,
    } = params;
    const isImage = type === 'image';

    try {
      dispatch(updateFile({ fileId: uploadFile.fileId, status: 'uploading' }));
      
      const { url, id, pos: tempFilePos } = await api.post<{ url: string; id: string; pos: number }>(
        tempUploadPath, 
        {
          noteId,
          filename: uploadFile.file.name,
          size: uploadFile.file.size,
          type,
          pos,
        });

      unlockNextStep?.();

      dispatch(updateFile({ 
        fileId: uploadFile.fileId, 
        tempId: id,
        pos: tempFilePos,
      }));

      const form = new FormData();
      form.append('file', uploadFile.file);

      await axios[isImage ? 'post' : 'put'](
        url, 
        isImage ? form : uploadFile.file,
        { 
          signal,
          onUploadProgress: (event) => {
            const progress = Math.floor((event.progress || 0) * 100);

            dispatch(updateFile({ 
              fileId: uploadFile.fileId, 
              progress,
            }));

            updateFileUploadStatus(id, progress);
          }, 
        });

      await api.post(getUploadConfirmPath(id), {});

      dispatch(updateFile({
        fileId: uploadFile.fileId, 
        progress: 0,
        status: 'processing',
      }));

      await dispatch(connectSSE<{ 
        progress: number;
        realId: string | null;
        error?: { text: string, code: number };
       }>({
         url: `${getBaseApi()}/upload/status/${id}`,
         onMessage: (data, close) => {
           const isComplete = !!data.realId;
          
           if (data.error) {
             dispatch(updateFile({ fileId: uploadFile.fileId, status: 'error', error: data.error.text }));
             close();
             return;
           }
           
           if (isComplete) {
             dispatch(updateFile({
               fileId: uploadFile.fileId, 
               realId: data.realId,
               progress: 100,
               status: 'complete',
             }));
             onComplete?.();
             close();
           } else {
             dispatch(updateFile({
               fileId: uploadFile.fileId, 
               progress: data.progress,
             })); 
           }
         },
       }));
    } catch(error) {
      if (axios.isCancel(error)) {
        dispatch(updateFile({ fileId: uploadFile.fileId, status: 'canceled' }));
        onCancel?.();
        return;
      }
      dispatch(updateFile({ fileId: uploadFile.fileId, status: 'error', error: parseApiError(error).message }));
    }
  };

type UploadAttachmentByTypeParams = UploadAttachmentParams & {
  noteId: number;
  type: UploadFileType; 
  signal?: AbortSignal;
}

export const uploadAttachmentByType = (params: UploadAttachmentByTypeParams): ThunkAction => 
  async (dispatch, getState) => {
    const {   
      type, 
      noteId, 
      uploadFile, 
      removeFiles,
    } = params;

    const getAttachmentLoadPath = (type: UploadFileType, id: string) => {
      switch(type) {
      case 'file':
        return `/notes/${noteId}/files/${id}`;
      case 'audio':
        return `/notes/${noteId}/audio/${id}`;
      case 'image':
        return `/notes/${noteId}/images/${id}`;
      case 'video':
        return `/notes/${noteId}/videos/${id}`;
      default:
        throw new Error(`Invalid attachment type: ${type}`);
      }
    };

    const getNoteAttachmentField = (type: UploadFileType) => {
      switch(type) {
      case 'file':
        return 'files';
      case 'audio':
        return 'audio';
      case 'image':
        return 'images';
      case 'video':
        return 'videos';
      default:
        throw new Error(`Invalid attachment type: ${type}`);
      }
    };

    async function onComplete() {
      const uploadEntity = selectUploadFileEntity(getState(), uploadFile.fileId);
      
      if (!uploadEntity?.realId) {
        return;
      }
      
      const id = await api.get(getAttachmentLoadPath(type, uploadEntity.realId));

      const noteEntity = noteSelector.getById(getState(), noteId);

      if (!noteEntity) {
        return;
      }

      const attachmentField = getNoteAttachmentField(type);

      dispatch(updateEntity({
        id: noteId,
        type: 'note',
        data: {
          [attachmentField]: [...noteEntity[attachmentField], id],
        },
      }));

      removeFiles([uploadFile.fileId]);
    }

    await dispatch(uploadAttachmentByTypeBase({
      ...params,
      tempUploadPath: '/upload',
      getUploadConfirmPath: (id) => `/upload/${id}/uploaded`,
      onComplete,
      onCancel: () => {
        removeFiles([uploadFile.fileId]);
      },
    }));
  };

type RetryAttachmentUploadParams = Pick<UploadAttachmentParams, 'uploadFile' | 'removeFiles'>

export const retryAttachmentUpload = (params: RetryAttachmentUploadParams): ThunkAction =>
  async (dispatch, getState) => {
    const { uploadFile, removeFiles } = params;
    const entity = selectUploadFileEntity(getState(), uploadFile.fileId);

    if (!entity?.tempId) {
      // TODO log
      return;
    }

    try {
      const { pos } = await api.get<{ pos: number }>(`/upload/${entity.tempId}`);

      await dispatch(uploadAttachment({
        uploadFile,
        removeFiles,
        pos,
      }));
    } catch(err) {
      toaster.create({
        type: 'error',
        description: 'Error occured while uploading attachment',
      });
    }
  };