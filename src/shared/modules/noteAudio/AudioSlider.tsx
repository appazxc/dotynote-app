import React from 'react';

import { Slider, SliderProps } from 'shared/components/ui/slider';
import { useAudioTime } from 'shared/modules/noteAudio/useAudioTime';

type Props = {
  duration: number;
  onChange?: (time: number) => void;
} & Omit<SliderProps, 'onChange'>;

export const AudioSlider = React.memo((props: Props) => {
  const { duration, onChange, showThumb = true, ...restProps } = props;
  const { time, isDraggingRef, draggingTimeRef } = useAudioTime();

  return (
    <Slider
      showThumb={showThumb}
      position="relative"
      cursor={'pointer'}
      size="xs"
      max={duration}
      variant="solid"
      value={[Math.round(isDraggingRef.current ? draggingTimeRef.current : time)]}
      minH="6px"
      onValueChange={({ value: [startTime] }) => {
        draggingTimeRef.current = startTime;
        isDraggingRef.current = true;
      }}
      onValueChangeEnd={() => {
        onChange?.(draggingTimeRef.current);
        isDraggingRef.current = false;
      }}
      {...restProps}
    />
  );
});
