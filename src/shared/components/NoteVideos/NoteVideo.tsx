import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteFile } from 'shared/api/hooks/useDeleteNoteFile';
import { useDeleteNoteVideo } from 'shared/api/hooks/useDeleteNoteVideo';
import { VideoWidget } from 'shared/components/NoteVideos/VideoWidget';
import { noteVideoSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { downloadFile } from 'shared/util/downloadFile';
import { formatFileSize } from 'shared/util/formatFileSize';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number,
  id: string,
  size?: 'sm' | 'md',
}

export const NoteVideo = React.memo(({ id, noteId, size }: Props) => {
  const getFileById = React.useMemo(() => noteVideoSelector.makeGetById(), []);
  const noteVideo = useAppSelector(state => getFileById(state, id));

  invariant(noteVideo, 'Missing note video upload');

  const { filename, size: fileSize } = noteVideo;
  const { name, extension } = splitFileName(filename);
  
  const { mutate, isPending } = useDeleteNoteVideo();
  
  const handleFileDownload = async () => {
    const fileUrl = await api.get<string>(`/notes/videos/${id}/signed-url`);

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
    <VideoWidget
      name={name}
      size={size}
      fileSize={formatFileSize(fileSize)}
      extension={extension}
      options={options}
    />
  );
});
