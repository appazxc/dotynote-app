import { UploadFileType, useFileUpload } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadEntities } from 'shared/modules/fileUpload/fileUploadSelectors';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { useAppSelector } from 'shared/store/hooks';

type Params = {
    noteId?: number,
    type?: UploadFileType,
    status?: UploadFileEntity['status'],
}

export const useUploadEntities = (params: Params) => {
  const { files } = useFileUpload();
  
  return useAppSelector(state => 
    selectUploadEntities(state, { 
      files, 
      ...params,
    }));
};