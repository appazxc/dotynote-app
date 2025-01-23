import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteFile } from 'shared/api/hooks/useDeleteNoteFile';
import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { formatFileSize } from 'shared/components/NoteFiles/formatFileSize';
import { splitFileName } from 'shared/components/NoteFiles/splitFileName';
import { downloadFile } from 'shared/util/downloadFile';

type Props = {
  noteId: number,
  id: string,
  filename: string,
  size?: 'sm' | 'md',
  fileSize: number,
  isDisabled?: boolean,
  url: string,
}

export const NoteFile = React.memo(({ id, noteId, url, filename, isDisabled, fileSize, size }: Props) => {
  const { name, extension } = splitFileName(filename);
  
  const { mutate, isPending } = useDeleteNoteFile();
  
  const handleFileDownload = async () => {
    const fileUrl = await api.get<string>(`/notes/files/${id}/signed-url`);

    downloadFile(fileUrl);
  };

  const options = [
    { 
      label: 'Download', 
      onClick: () =>{
        handleFileDownload();
      }, 
    },
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

  return <audio controls src={url} />;

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
