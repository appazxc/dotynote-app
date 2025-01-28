import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from 'shared/components/ui/hover-card';
import { Icon } from 'shared/components/ui/icon';
import { PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { useAudio } from 'shared/modules/noteAudio/AudioProvider';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { audioSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { formatTime } from 'shared/util/formatTime';

export const SpaceAudioWidget = React.memo(() => {
  const { isPlaying, activeAudioId, playAudio, stopAudio, pauseAudio, currentTime } = useAudio();
  const audio = useAppSelector(state => audioSelector.getById(state, activeAudioId));

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
            onClick={() => {
              !isPlaying ? playAudio() : pauseAudio();
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Icon>
        </Box>
        <Box mt="2">
          <AudioSlider
            isActive
            currentTime={currentTime}
            duration={audio.duration}
            onChange={(startTime) => playAudio({ startTime })}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="xs" color="fg.subtle">{formatTime(currentTime)}</Text>
          <Text fontSize="xs" color="fg.subtle">{formatTime(audio.duration)}</Text>
        </Box>
      </Box>
    );
  }, [audio, isPlaying, pauseAudio, playAudio, currentTime]);
  
  if (!audio) {
    return null;
  }

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
            !isPlaying ? playAudio() : pauseAudio();
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            stopAudio();
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
