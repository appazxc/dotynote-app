import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteVideo } from 'shared/api/hooks/useDeleteNoteVideo';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { noteVideoSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { decodeBlurHash } from 'shared/util/decodeBlurHash';
import { downloadFile } from 'shared/util/downloadFile';
import { formatTime } from 'shared/util/formatTime';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number;
  videoId: string;
  width: number;
  height: number;
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
  const [isLoaded, setLoaded] = React.useState(false);

  invariant(noteVideo, 'Missing note video upload');
  
  const { filename, size: fileSize, thumbnail: { blurhash, url } } = noteVideo;
  const placeholder = React.useMemo(() => {
    if (!blurhash) return null;
  
    return decodeBlurHash(blurhash, 32, 32);
  }, [blurhash]);
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
        <Box position="relative">
          <Box
            bg="gray.700/80"
            borderRadius="20px"
            px="6px"
            display="flex"
            width="fit-content"
            position="absolute"
            top="2"
            left="2"
          >
            <Text fontSize="xs" color="gray.100">{formatTime(noteVideo.duration)}</Text>
          </Box>
          <img
            style={{ 
              backgroundImage: placeholder && !isLoaded ? `url(${placeholder})` : undefined,
              backgroundSize: 'cover',
              borderRadius: 6, 
            }}
            src={url}
            loading="lazy"
            height={height}
            width={width}
            onLoad={() => {
              setLoaded(true);
            }}
          />
        </Box>
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
});