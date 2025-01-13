import React from 'react';

import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { formatFileSize } from 'shared/components/NoteFiles/formatFileSize';
import { splitFileName } from 'shared/components/NoteFiles/splitFileName';

type Props = {
  filename: string,
  size: number,
  progress: number | null,
}

export const UploadingFile = React.memo(({ filename, size, progress }: Props) => {
  const { name, extension } = splitFileName(filename);
  
  return (
    <FileSnippet
      name={name}
      size={formatFileSize(size)}
      extension={extension}
      progress={progress}
    />
  );
});