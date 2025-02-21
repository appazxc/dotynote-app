import React from 'react';

import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { formatFileSize } from 'shared/util/formatFileSize';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  id: string;
  filename: string;
  size?: 'sm' | 'md';
  fileSize: number;
}

export const UploadingAudio = React.memo(({ id, filename, fileSize, size }: Props) => {
  const uploadAudio = useAppSelector(state => selectUploadFileEntity(state, id));

  invariant(uploadAudio, 'Uploading file is missing');
  
  const { name, extension } = splitFileName(filename);

  return (
    <FileSnippet
      name={name}
      fileSize={formatFileSize(fileSize)}
      extension={extension}
      progress={getFileUploadProgress(uploadAudio)}
      size={size}
    />
  );
});