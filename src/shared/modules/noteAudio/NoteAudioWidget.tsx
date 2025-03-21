import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Icon } from 'shared/components/ui/icon';
import { DotsIcon, PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { useAudioTime } from 'shared/modules/noteAudio/useAudioTime';
import { formatTime } from 'shared/util/formatTime';

type Props = {
  isPlaying: boolean;
  isActive: boolean;
  name: string;
  duration: number;
  isLoading: boolean;
  onPlay: (startTime?: number) => void;
  onTrackClick: (startTime: number) => void;
  onPause: () => void;
  options?: { label: string; onClick: () => void }[];
};

type NoteAudioTimeProps = { 
  isActive: Props['isActive'];
  duration: Props['duration'];
}

const NoteAudioTime = React.memo(({ isActive, duration }: NoteAudioTimeProps) => {
  const { time, isDraggingRef, draggingTimeRef } = useAudioTime();

  const value = isActive 
    ? formatTime(isDraggingRef.current ? draggingTimeRef.current : time)
    : formatTime(duration);

  return <Text fontSize="xs" color="gray.400">{value}</Text>;
});

export const NoteAudioWidget = React.memo((props: Props) => {
  const { 
    name, 
    duration,
    options,
    isActive,
    isPlaying,
    isLoading,
    onPause,
    onPlay,
    onTrackClick, 
  } = props;

  return (
    <Box position="relative" border="none">
      <Box display="flex">
        <Box
          p="2"
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="3"
          pb="1"
        >
          <Box
            bg="gray.900"
            borderRadius="full"
            w="40px"
            h="40px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            flexShrink="0"
            onClick={() => {
              if (isLoading) {
                return;
              }

              if (isPlaying) {
                onPause();
              } else {
                onPlay();
              }
            }}
          >
            <Icon
              color="white"
              fontSize="20px"
              position="relative"
              left="1px"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Icon>
          </Box>
          <Box>
            <Box lineClamp={1}>
              {name}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="1"
            >
              <NoteAudioTime isActive={isActive} duration={duration} />
            </Box>
          </Box>
        
        </Box>
        {options && (
          <Menu placement="bottom-end">
            <MenuTrigger>
              <IconButton
                aria-label=""
                size="md"
                variant="plain"
                display="inline-flex"
                alignSelf="start"
                iconSize="auto"
                ml="auto"
              >
                <DotsIcon />
              </IconButton> 
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
        )}
      </Box>
      {isActive && (
        <AudioSlider
          duration={duration}
          onChange={onTrackClick}
        />
      )}
    </Box>
  );
});
