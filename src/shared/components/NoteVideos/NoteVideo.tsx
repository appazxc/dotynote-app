import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteVideo } from 'shared/api/hooks/useDeleteNoteVideo';
import { BaseImage } from 'shared/components/BaseImage';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { NoteVideoModal } from 'shared/containers/modals/NoteVideoModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { noteVideoSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { downloadFile } from 'shared/util/downloadFile';
import { formatTime } from 'shared/util/formatTime';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
  extraId?: number | string;
  videoId: string;
  width: number;
  height: number;
}

export const NoteVideo = React.memo((props: Props) => {
  const { extraId, videoId, noteId, width, height } = props;
  const getVideoById = React.useMemo(() => noteVideoSelector.makeGetEntityById(), []);
  const noteVideo = useAppSelector(state => getVideoById(state, videoId));
  const [isLoaded, setLoaded] = React.useState(false);
  const dispatch = useAppDispatch();
  invariant(noteVideo, 'Missing note video upload');

  const { thumbnail: { blurhash, url } } = noteVideo;
  
  const { mutate, isPending } = useDeleteNoteVideo();
  
  const handleFileDownload = async () => {
    const fileUrl = await api.get<string>(`/notes/videos/${videoId}/signed-download-url`);

    downloadFile(fileUrl);
  };

  const handleVideoClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    
    dispatch(showModal({
      id: modalIds.noteVideo,
      extraId: noteVideo.id + extraId,
    }));
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

  return (
    <>
      <Menu isContextMenu>
        <MenuTrigger>
          <Box
            position="relative"
            cursor="pointer"
            height={height}
            width={width}
            onClick={handleVideoClick}
          >
            <BaseImage
              src={url}
              height={height}
              width={width}
              isLoaded={isLoaded}
              blurhash={blurhash}
              onLoad={() => {
                setLoaded(true);
              }}
            />
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
      <NoteVideoModal
        noteId={noteId}
        videoId={videoId}
        extraId={extraId}
      />
    </>
  );
});