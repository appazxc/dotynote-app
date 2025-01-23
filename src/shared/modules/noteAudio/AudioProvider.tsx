import React from 'react';

import { selectAudioUrl, selectIsAudioPlaying } from 'shared/modules/noteAudio/audioSelectors';
import { updateAudioCurrentTime } from 'shared/modules/noteAudio/audioSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

type AudioContext = {
  play: (audioId: string) => void,
  pause: () => void,
}

const AudioContext = React.createContext<AudioContext>(null!);

export const AudioProvider = ({ children }) => {
  const isPlaying = useAppSelector(selectIsAudioPlaying);
  const url = useAppSelector(selectAudioUrl);
  const audioId = useAppSelector(state => state.audio.audioId);
  const startTime = useAppSelector(state => state.audio.startTime);
  const audioRef = React.useRef(new Audio()); 
  const dispatch = useAppDispatch();
  
  const handleTimeUpdate = React.useCallback(() => {
    if (audioRef.current) {
      dispatch(updateAudioCurrentTime(audioRef.current.currentTime));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioId, startTime]);

  return (
    <>
      {children}

      {url && (
        <audio
          ref={audioRef}
          src={url}
          onTimeUpdate={handleTimeUpdate}
        />
      )}
    </>
  );
};