import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteFile } from 'shared/api/hooks/useDeleteNoteFile';
import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { noteFileSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { downloadFile } from 'shared/util/downloadFile';
import { formatFileSize } from 'shared/util/formatFileSize';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number;
  id: string;
  size?: 'sm' | 'md';
}

export const NoteFile = React.memo(({ id, noteId, size }: Props) => {
  const getFileById = React.useMemo(() => noteFileSelector.makeGetById(), []);
  const noteFile = useAppSelector(state => getFileById(state, id));

  invariant(noteFile, 'Missing note file');

  const { filename, size: fileSize } = noteFile;
  const { name, extension } = splitFileName(filename);
  
  const { mutate, isPending } = useDeleteNoteFile();
  
  const handleFileDownload = async () => {
    const fileUrl = await api.get<string>(`/notes/files/${id}/signed-download-url`);

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

  return (
    <FileSnippet
      name={name}
      size={size}
      fileSize={formatFileSize(fileSize)}
      extension={extension}
      options={options}
    />
  );
});
