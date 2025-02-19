import React from 'react';

import { useFileUpload } from 'shared/modules/fileUpload/FileUploadProvider';
import { selectUploadFileEntity, UploadEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';

export const useUploadEntity = (fileId: string): UploadEntity | null => {
  const { files } = useFileUpload();
  
  const file = React.useMemo(() => {
    return files.find(f => f.fileId === fileId);
  }, [fileId, files]);

  const entity = useAppSelector(state => selectUploadFileEntity(state, fileId));

  if (!file || !entity) {
    return null;
  }

  return {
    ...file,
    ...entity,
  };
};