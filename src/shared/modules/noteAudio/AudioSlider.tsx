import React from 'react';

import { Slider, SliderProps } from 'shared/components/ui/slider';
import { AudioSliderDragParams } from 'shared/modules/noteAudio/AudioProvider';

type Props = {
  isActive: boolean,
  isDragging?: boolean,
  duration: number,
  currentTimePos?: number,
  currentTime: number | null,
  onChange?: (time: number) => void,
  onDragChange?: (params: AudioSliderDragParams) => void
} & Omit<SliderProps, 'onChange'>;

export const AudioSlider = React.memo((props: Props) => {
  const { duration, currentTime, onChange, isActive, onDragChange, isDragging, currentTimePos, ...restProps } = props;

  return (
    <Slider
      disabled={!isActive}
      showThumb={isActive}
      position="relative"
      cursor={isActive ? 'pointer' : 'default'}
      size="xs"
      max={duration}
      variant="solid"
      value={[isDragging && currentTimePos ? currentTimePos : currentTime || 0]}
      minH="6px"
      onValueChange={({ value: [startTime] }) => {
        onDragChange?.({ isDragging: true, currentTimePos: startTime });
      }}
      onValueChangeEnd={() => {
        onChange?.(currentTimePos || 0);
        onDragChange?.({ isDragging: false, currentTimePos: 0 });
      }}
      {...restProps}
    />
  );
});
