import { Box, Card, IconButton, Text } from '@chakra-ui/react';
import isNumber from 'lodash/isNumber';
import React from 'react';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Icon } from 'shared/components/ui/icon';
import { DotsIcon, PauseIcon, PlayIcon } from 'shared/components/ui/icons';
import { AudioSlider } from 'shared/modules/noteAudio/AudioSlider';
import { formatTime } from 'shared/util/formatTime';

type Props = {
  isPlaying: boolean,
  name: string,
  duration: number,
  currentTime: number | null,
  onPlay: (startTime?: number) => void,
  onProgressClick: (startTime: number) => void,
  onPause: () => void,
  options?: { label: string, onClick: () => void }[],
};

export const NoteAudioWidget = React.memo((props: Props) => {
  const { name, duration, currentTime, options, isPlaying, onPause, onPlay, onProgressClick } = props;
  const value = React.useRef<number>(currentTime || 0);
  const [isDragging, setIsDragging] = React.useState(false);
  const isActive = !!currentTime;

  if (!isDragging) {
    value.current = currentTime || 0;
  }

  return (
    <Card.Root position="relative">
      <Card.Body
        p="2"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="3"
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
            justifyContent="center"
            display="flex"
            alignItems="center"
            gap="1"
          >
            {isNumber(currentTime) ? (
              <Text fontSize="xs" color="gray.400">{formatTime(isDragging ? value.current : currentTime)}</Text>
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
      </Card.Body>
      <AudioSlider
        bottom="-2px"
        isActive={isActive}
        currentTime={currentTime}
        duration={duration}
        onChange={onProgressClick}
      />
    </Card.Root>
  );
});
