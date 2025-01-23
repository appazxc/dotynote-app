import React from 'react';

import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { formatFileSize } from 'shared/components/NoteFiles/formatFileSize';
import { splitFileName } from 'shared/components/NoteFiles/splitFileName';

type Props = {
  filename: string,
  size?: 'sm' | 'md',
  fileSize: number,
  progress: number | null,
}

export const UploadingFile = React.memo(({ filename, fileSize, size, progress }: Props) => {
  const { name, extension } = splitFileName(filename);
  
  return (
    <FileSnippet
      name={name}
      fileSize={formatFileSize(fileSize)}
      extension={extension}
      progress={progress}
      size={size}
    />
  );
});