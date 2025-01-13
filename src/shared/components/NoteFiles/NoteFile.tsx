import React from 'react';

import { useDeleteNoteFile } from 'shared/api/hooks/useDeleteNoteFile';
import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { formatFileSize } from 'shared/components/NoteFiles/formatFileSize';
import { splitFileName } from 'shared/components/NoteFiles/splitFileName';

type Props = {
  noteId: number,
  id: string,
  filename: string,
  size?: 'sm' | 'md',
  fileSize: number,
  isDisabled?: boolean,
}

export const NoteFile = React.memo(({ id, noteId, filename, isDisabled, fileSize, size }: Props) => {
  const { name, extension } = splitFileName(filename);
  
  const { mutate, isPending } = useDeleteNoteFile();
  
  const options = [
    { 
      label: 'Delete', 
      onClick: () =>{
        if (isPending) {
          return;
        }

        mutate({
          noteId,
          entityId: id,
        });
      }, 
    },
  ];

  return (
    <FileSnippet
      name={name}
      size={size}
      fileSize={formatFileSize(fileSize)}
      extension={extension}
      options={options}
      isDisabled={isDisabled}
    />
  );
});
