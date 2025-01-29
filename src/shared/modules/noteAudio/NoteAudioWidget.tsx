import { Box, IconButton, Text } from '@chakra-ui/react';
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
  currentTimePos: number,
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
    currentTimePos,
    onPause,
    onPlay,
    onProgressClick, 
    onDragChange,
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
            <Box lineClamp={1}>
              {name}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="1"
            >
              {isNumber(currentTime) ? (
                <Text fontSize="xs" color="gray.400">{formatTime(isDragging ? currentTimePos : currentTime)}</Text>
              ) : (
                <Text fontSize="xs" color="gray.400">{formatTime(duration)}</Text>
              )}
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
      <AudioSlider
        opacity={isActive ? 1 : 0}
        isDragging={isDragging}
        currentTimePos={currentTimePos}
        isActive={isActive}
        currentTime={currentTime}
        duration={duration}
        onChange={onProgressClick}
        onDragChange={onDragChange}
      />
    </Box>
  );
});
