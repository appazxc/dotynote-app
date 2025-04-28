import React from 'react';

import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { emitter } from 'shared/util/emitter';
import { formatFileSize } from 'shared/util/formatFileSize';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  id: string;
  filename: string;
  size?: 'sm' | 'md';
  fileSize: number;
}

export const UploadingFile = React.memo(({ id, filename, fileSize, size }: Props) => {
  const uploadFile = useAppSelector(state => selectUploadFileEntity(state, id));

  invariant(uploadFile, 'Uploading file is missing');

  const { name, extension } = splitFileName(filename);

  const options = React.useMemo(() => {
    return [
      ...uploadFile.status === 'uploading' || uploadFile.status === 'processing' && uploadFile.tempId ? [{
        label: 'Cancel',
        onClick: () => {
          emitter.emit(`cancelFileUpload:${uploadFile.fileId}`);
        },
      }] : [],
      ...uploadFile.status === 'error' ? [
        {
          label: 'Remove',
          onClick: () => {
            emitter.emit(`cancelFileUpload:${uploadFile.fileId}`);
          },
        },
      ] : [],
    ];
  }, [uploadFile.status, uploadFile.fileId, uploadFile.tempId]);

  return (
    <FileSnippet
      name={name}
      fileSize={formatFileSize(fileSize)}
      extension={extension}
      progress={getFileUploadProgress(uploadFile)}
      size={size}
      borderColor={uploadFile.error ? 'border.warning' : undefined}
      options={options}
    />
  );
});