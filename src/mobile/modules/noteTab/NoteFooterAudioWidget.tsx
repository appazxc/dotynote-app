import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { toggleMobileWidget } from 'shared/modules/noteAudio/audioSlice';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';
import { selectActiveAudio } from 'shared/selectors/audio/selectActiveAudio';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export const NoteFooterAudioWidget = React.memo(() => {
  const audio = useAppSelector(selectActiveAudio);
  const { 
    isPlaying,
    seek,
    togglePlayPause,
  } = useNoteAudio(audio?.id);
  const dispatch = useAppDispatch();
  
  if (!audio) {
    return null;
  }

  return (
    <Box w="full" position="relative">
      <Box
        borderRadius="md"
        boxShadow="0 0 0 2px black"
        position="absolute"
        bottom="2px"
        w="full"
        bg="white"
        overflow="hidden"
        justifyContent="space-between"
        alignItems="center"
        display="flex"
      >
        <Box p="2">
          <Text lineClamp={1} fontSize="sm">
            {audio.filename}
          </Text>
        </Box>
        <Stack
          direction="row"
          gap="0"
          alignItems="center"
        >
          <IconButton
            variant="plain"
            size="md"
            onClick={togglePlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton
            variant="plain"
            size="sm"
            onClick={() => {
              dispatch(toggleMobileWidget());
            }}
          >
            <IoIosArrowDown />
          </IconButton>
        </Stack>

        <Box
          position="absolute"
          bottom="-2px"
          w="full"
        >
          <AudioSlider
            showThumb={false}
            duration={audio.duration}
            onChange={seek}
          />
        </Box>
      </Box>
    </Box>
  );
});
