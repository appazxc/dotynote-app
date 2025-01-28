import { Box, Card, IconButton, Text } from '@chakra-ui/react';
import isNumber from 'lodash/isNumber';
import React from 'react';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Icon } from 'shared/components/ui/icon';
import { DotsIcon, PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { AudioSliderDragParams } from 'shared/modules/noteAudio/AudioProvider';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { formatTime } from 'shared/util/formatTime';

type Props = {
  isPlaying: boolean,
  isActive: boolean,
  name: string,
  duration: number,
  currentTime: number | null,
  isDragging: boolean,
  dragTime: number,
  onPlay: (startTime?: number) => void,
  onProgressClick: (startTime: number) => void,
  onPause: () => void,
  options?: { label: string, onClick: () => void }[],
  onDragChange: (params: AudioSliderDragParams) => void,
};

export const NoteAudioWidget = React.memo((props: Props) => {
  const { 
    name, 
    duration,
    currentTime,
    options,
    isActive,
    isPlaying,
    isDragging,
    dragTime,
    onPause,
    onPlay,
    onProgressClick, 
    onDragChange,
  } = props;

  return (
    <Box position="relative" border="none">
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
          onClick={() => {
            isPlaying ? onPause() : onPlay();
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
          <Box>
            {name}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap="1"
          >
            {isNumber(currentTime) ? (
              <Text fontSize="xs" color="gray.400">{formatTime(isDragging ? dragTime : currentTime)}</Text>
            ) : (
              <Text fontSize="xs" color="gray.400">{formatTime(duration)}</Text>
            )}
          </Box>
        </Box>
        {options && (
          <Menu placement="bottom-end">
            <MenuTrigger>
              <IconButton
                aria-label=""
                variant="plain"
                display="inline-flex"
                iconSize="auto"
                position="absolute"
                top="0"
                right="0"
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
      <AudioSlider
        opacity={isActive ? 1 : 0}
        isDragging={isDragging}
        dragTime={dragTime}
        isActive={isActive}
        currentTime={currentTime}
        duration={duration}
        onChange={onProgressClick}
        onDragChange={onDragChange}
      />
    </Box>
  );
});
