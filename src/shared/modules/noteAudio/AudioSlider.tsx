import React from 'react';

import { Slider, SliderProps } from 'shared/components/ui/slider';
import { AudioSliderDragParams } from 'shared/modules/noteAudio/AudioProvider';

type Props = {
  isActive: boolean,
  isDragging: boolean,
  duration: number,
  dragTime: number,
  currentTime: number | null,
  onChange: (time: number) => void,
  onDragChange?: (params: AudioSliderDragParams) => void
} & Omit<SliderProps, 'onChange'>;

export const AudioSlider = React.memo((props: Props) => {
  const { duration, currentTime, onChange, isActive, onDragChange, isDragging, dragTime, ...restProps } = props;

  return (
    <Slider
      disabled={!isActive}
      showThumb={isActive}
      position="relative"
      cursor={isActive ? 'pointer' : 'default'}
      size="xs"
      max={duration}
      variant="solid"
      value={[isDragging ? dragTime : currentTime || 0]}
      minH="6px"
      onValueChange={({ value: [startTime] }) => {
        onDragChange?.({ isDragging: true, dragTime: startTime });
      }}
      onValueChangeEnd={() => {
        onChange(dragTime);
        onDragChange?.({ isDragging: false, dragTime: 0 });
      }}
      {...restProps}
    />
  );
});
