import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { useAudio } from 'shared/modules/noteAudio/AudioProvider';
import { toggleMobileWidget } from 'shared/modules/noteAudio/audioSlice';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { audioSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

type Props = {};

export const NoteFooterAudioWidget = React.memo((props: Props) => {
  const { 
    isPlaying,
    activeAudioId,
    playAudio,
    stopAudio,
    pauseAudio,
    currentTime,
    isDragging,
    currentTimePos,
    onDragChange, 
  } = useAudio();
  const dispatch = useAppDispatch();
  const audio = useAppSelector(state => audioSelector.getById(state, activeAudioId));
  
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
            onClick={() => {
              !isPlaying ? playAudio() : pauseAudio();
            }}
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
            isActive={false}
            currentTime={currentTime}
            duration={audio.duration}
          />
        </Box>
      </Box>
    </Box>
  );
});
