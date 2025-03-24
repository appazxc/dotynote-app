import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from 'shared/components/ui/hover-card';
import { Icon } from 'shared/components/ui/icon';
import { PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { useAudioTime } from 'shared/modules/noteAudio/useAudioTime';
import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';
import { ApiNoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';
import { formatTime } from 'shared/util/formatTime';

type Props = {
  audio: ApiNoteAudioEntity;
}

const CurrentTime = React.memo(() => {
  const { time, isDraggingRef, draggingTimeRef } = useAudioTime();

  return (
    <Text fontSize="xs" color="fg.subtle">
      {formatTime(isDraggingRef.current ? draggingTimeRef.current : time)}
    </Text>
  );
});

export const SpaceNoteAudioWidget = React.memo(({ audio }: Props) => {
  const { 
    isPlaying,
    play,
    pause,
    seek,
    stop,
    togglePlayPause,
  } = useNoteAudio(audio.id);

  const content = React.useMemo(() => {
    if (!audio) {
      return null;
    }

    return (
      <Box
        bg="white"
        w="200px"
      >
        {audio.filename}

        <Box display="flex" justifyContent="center">
          <Icon
            color="gray.700"
            fontSize="30px"
            cursor="pointer"
            onClick={togglePlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Icon>
        </Box>
        <Box mt="2">
          <AudioSlider
            duration={audio.duration}
            onChange={seek}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <CurrentTime />
          <Text fontSize="xs" color="fg.subtle">{formatTime(audio.duration)}</Text>
        </Box>
      </Box>
    );
  }, [
    audio,
    isPlaying,
    togglePlayPause,
    seek,
  ]);

  return (
    <HoverCardRoot
      size="sm"
      positioning={{ placement: 'bottom-end' }}
    >
      <HoverCardTrigger asChild>
        <Box
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.700"
          w="32px"
          cursor="pointer"
          position="relative"
          alignItems="center"
          justifyContent="center"
          display="flex"
          onClick={() => {
            if (!isPlaying) {
              play();
            } else {
              pause(); 
            }
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          <Icon
            color="gray.700"
            fontSize="20px"
            position="relative"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Icon>
        </Box>
      </HoverCardTrigger>
     
      <HoverCardContent
        borderWidth="1px"
        borderColor="gray.600"
      >
        {content}
      </HoverCardContent>
    </HoverCardRoot>
  );
});
