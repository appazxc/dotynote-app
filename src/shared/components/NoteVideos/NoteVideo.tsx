import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteVideo } from 'shared/api/hooks/useDeleteNoteVideo';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { VideoWidget } from 'shared/components/NoteVideos/VideoWidget';
import { DotsIcon } from 'shared/components/ui/icons';
import { VideoPlayer } from 'shared/components/VideoPlayer';
import { noteVideoSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { downloadFile } from 'shared/util/downloadFile';
import { formatFileSize } from 'shared/util/formatFileSize';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number,
  videoId: string,
  width: number,
  height: number,
}
// <VideoPlayer
//       url={noteVideo.url}
//       width={noteVideo.width}
//       height={noteVideo.height}
//       mimeType={noteVideo.mimeType}
//     /> 
export const NoteVideo = React.memo((props: Props) => {
  const { videoId, noteId, width, height } = props;
  const getVideoById = React.useMemo(() => noteVideoSelector.makeGetEntityById(), []);
  const noteVideo = useAppSelector(state => getVideoById(state, videoId));

  invariant(noteVideo, 'Missing note video upload');

  const { filename, size: fileSize } = noteVideo;
  const { name, extension } = splitFileName(filename);
  
  const { mutate, isPending } = useDeleteNoteVideo();
  
  const handleFileDownload = async () => {
    const fileUrl = await api.get<string>(`/notes/videos/${videoId}/signed-url`);

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
          entityId: videoId,
        });
      }, 
    },
  ];
  console.log('noteVideo', noteVideo);

  return (
    <Menu isContextMenu>
      <MenuTrigger>
        <Box
          backgroundImage={`url(${noteVideo.thumbnail.url})`} 
          backgroundSize="cover"
          height={height}
          width={width}
          borderRadius="md"
        />
      </MenuTrigger>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option.label}
            label={option.label}
            onClick={option.onClick}
          />
        ))}
      </MenuList>
    </Menu>
  );

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
