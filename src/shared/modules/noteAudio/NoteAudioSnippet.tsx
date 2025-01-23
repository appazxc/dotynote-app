import { Box, Card, HStack, IconButton, Separator, Text } from '@chakra-ui/react';
import isNumber from 'lodash/isNumber';
import React from 'react';
import { FaRegFileLines } from 'react-icons/fa6';
import { IoPlay } from 'react-icons/io5';
import { IoPauseOutline } from 'react-icons/io5';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Icon } from 'shared/components/ui/icon';
import { DotsIcon } from 'shared/components/ui/icons';
import { ProgressBar, ProgressRoot } from 'shared/components/ui/progress';
import { Slider } from 'shared/components/ui/slider';
import { updateAudioCurrentTime } from 'shared/modules/noteAudio/audioSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { formatTime } from 'shared/util/formatTime';

type Props = {
  isPlaying: boolean,
  name: string,
  duration: number,
  currentTime: number | null,
  onPlay: (startTime?: number) => void,
  onPause: () => void,
};

export const NoteAudioSnippet = React.memo((props: Props) => {
  const { name, duration, currentTime, isPlaying, onPause, onPlay } = props;
  const value = React.useRef<number>(currentTime || 0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [newValue, setNewValue] = React.useState<number>(-1);
  const dispatch = useAppDispatch();
  
  if (!isDragging) {
    console.log('change currentTime', currentTime);
    value.current = currentTime || 0;
  }
  console.log('value', newValue >= 0 ? newValue : value.current, newValue >= 0, newValue, value.current);
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
            {isPlaying ? <IoPauseOutline /> : <IoPlay />}
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
              <Text fontSize="xs" color="gray.400">{formatTime(currentTime || 0)}</Text>
            ) : (
              <Text fontSize="xs" color="gray.400">{formatTime(duration)}</Text>
            )}
          </Box>
        </Box>
      </Card.Body>
      <Slider
        showThumb={!!currentTime}
        position="relative"
        bottom="-2px"
        cursor="pointer"
        size="xs"
        max={duration}
        variant="solid"
        value={[newValue >= 0 ? newValue : value.current]}
        minH="6px"
        onValueChange={({ value: [startTime] }) => {
          setIsDragging(true);
          console.log('onValueChange');
          setNewValue(startTime);
          dispatch(updateAudioCurrentTime(startTime));
        }}
        onValueChangeEnd={() => {
          console.log('onValueChangeEnd', newValue);
          value.current = newValue;
          onPlay(newValue);
          setIsDragging(false);
          setNewValue(-1);
        }}
      />
    </Card.Root>
  );
});
