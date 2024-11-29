import { api } from 'shared/api';
import { FilesType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/selectors';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

export const uploadFiles = (files: FilesType): ThunkAction => async (dispatch, getState) => {
  
  for await (const file of files) {
    await dispatch(uploadFile(file));
  }
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
  async (dispatch, getState) => {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('noteId', String(entity.zoneId));
      
    const result = await api.post('/upload/images', formData);

    console.log('result', result);
  };
