import { Box } from '@chakra-ui/react';
import React from 'react';

import { Slider, SliderProps } from 'shared/components/ui/slider';

type Props = {
  isActive: boolean,
  duration: number,
  currentTime: number | null,
  onChange: (time: number) => void,
} & Omit<SliderProps, 'onChange'>;

export const AudioSlider = React.memo((props: Props) => {
  const { duration, currentTime, onChange, isActive, ...restProps } = props;
  const value = React.useRef<number>(currentTime || 0);
  const [isDragging, setIsDragging] = React.useState(false);

  if (!isDragging) {
    value.current = currentTime || 0;
  }

  return (
    <Slider
      showThumb={isActive}
      position="relative"
      cursor={isActive ? 'pointer' : 'default'}
      size="xs"
      max={duration}
      variant="solid"
      value={[currentTime ? value.current : 0]}
      minH="6px"
      onValueChange={({ value: [startTime] }) => {
        setIsDragging(true);
        value.current = startTime;
      }}
      onValueChangeEnd={() => {
        onChange(value.current);
        setIsDragging(false);
      }}
      {...restProps}
    />
  );
});
