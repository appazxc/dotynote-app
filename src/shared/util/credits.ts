import { UploadFile, UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadEntities } from 'shared/modules/fileUpload/fileUploadSelectors';
import { ThunkAction } from 'shared/types/store';

interface CreditRequirements {
  note: number;
  post: number;
  image: number;
  file: number; // per MB
  video: number; // per MB
  audio: number; // per MB
}

// Credit requirements per resource type
const CREDIT_REQUIREMENTS: CreditRequirements = {
  // 1 create, 1 store
  note: 2,
  // 1 create, 1 store, 1 stick
  post: 3,
  image: 10,
  file: 1, // per MB
  video: 1, // per MB
  audio: 1, // per MB
};

// Calculate file size in MB
const getFileSizeInMB = (size: number): number => {
  return size / (1024 * 1024);
};

// Get credits needed for specific file
export const getRequiredCreditsForFile = (file: File, type: UploadFileType): number => {
  switch (type) {
  case 'image':
    return CREDIT_REQUIREMENTS.image;
  case 'file':
    return Math.ceil(getFileSizeInMB(file.size)) * CREDIT_REQUIREMENTS.file;
  case 'audio':
    return Math.ceil(getFileSizeInMB(file.size)) * CREDIT_REQUIREMENTS.audio;
  case 'video':
    return Math.ceil(getFileSizeInMB(file.size)) * CREDIT_REQUIREMENTS.video;
  default:
    throw new Error(`Unknown file type: ${type}`);
  }
};

// Get credits needed for upload files array
export const getRequiredCreditsForUploadFiles = (files: UploadFile[]): ThunkAction => (_, getState) => {
  const uploadEntities = selectUploadEntities(getState(), { files });
  
  return uploadEntities.reduce((total, { file, type }) => {
    return total + getRequiredCreditsForFile(file, type);
  }, 0);
};

export const getRequiredCreditsForCreatingResources = (resources: { note?: number, post?: number }): number => {
  const { note = 0, post = 0 } = resources;

  return note * CREDIT_REQUIREMENTS.note + post * CREDIT_REQUIREMENTS.post;
};