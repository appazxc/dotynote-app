import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';

const FULL_UPLOADED_PROGRESS = 50;

export const getFileUploadProgress = (uploadFile: UploadFileEntity) => {
  const { progress, status } = uploadFile;

  if (status === 'complete') {
    return 100;
  }

  if (status === 'processing') {
    return FULL_UPLOADED_PROGRESS + progress / 2;
  }

  if (status === 'uploading') {
    return progress / 2;
  }

  return 0;
};