import React from 'react';
import { useAudioPlayerContext } from 'react-use-audio-player';

import { selectActiveAudioId } from 'shared/selectors/selectActiveAudio';
import { useAppSelector } from 'shared/store/hooks';
import { getAudioTime } from 'shared/util/audio/getAudioTime';
import { createReactContext } from 'shared/util/createReactContext';

type AudioTimeContextType = {
  time: number;
  draggingTimeRef: React.RefObject<number>;
  isDraggingRef: React.RefObject<boolean>;
};

export const AudioTimeContext = createReactContext<AudioTimeContextType>();

export const AudioTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frameRef = React.useRef<number>(0);
  const [pos, setPos] = React.useState(0);
  const isDraggingRef = React.useRef<boolean>(false);
  const draggingTimeRef = React.useRef<number>(pos);
  const { getPosition } = useAudioPlayerContext();

  React.useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition]);

  return (
    <AudioTimeContext.Provider value={{ time: pos, isDraggingRef, draggingTimeRef }}>
      {children}
    </AudioTimeContext.Provider>
  );
};
