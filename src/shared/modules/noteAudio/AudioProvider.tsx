import isNumber from 'lodash/isNumber';
import React from 'react';

import { selectAudioUrl } from 'shared/modules/noteAudio/audioSelectors';
import { useAppSelector } from 'shared/store/hooks';

export type AudioSliderDragParams = { isDragging: boolean, dragTime: number };

type AudioContext = {
  activeAudioId: string | null,
  isPlaying: boolean,
  isDragging: boolean,
  currentTime: number,
  dragTime: number,
  startAudio: (params: { audioId: string, startTime?: number }) => void,
  playAudio: (params?: { startTime?: number }) => void,
  pauseAudio: () => void,
  stopAudio: () => void,
  onDragChange: (params: AudioSliderDragParams) => void,
}

const AudioContext = React.createContext<AudioContext>(null!);

export const AudioProvider = ({ children }) => {
  const [audioId, setAudioId] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragTime, setDragTime] = React.useState<number>(0);
  const url = useAppSelector(state => selectAudioUrl(state, audioId));
  const audioRef = React.useRef(new Audio()); 

  const handleTimeUpdate = React.useCallback(() => {
    // !audioRef.current.paused add to prevent progress jumping when start playing another audio
    if (audioRef.current && !audioRef.current.paused) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const setAudioCurrentTime = React.useCallback((startTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
    }
  }, []);

  const setPlaying = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);
  
  const startAudio = React.useCallback(({ audioId, startTime = 0 }) => {
    // look handleTimeUpdate
    if (!audioRef.current.paused) {
      audioRef.current.pause();
    }
    setAudioId(audioId);
    setAudioCurrentTime(startTime);
    setCurrentTime(startTime);

    audioRef.current.onloadeddata = () => {
      setAudioCurrentTime(startTime);
      setCurrentTime(startTime);
      setPlaying();

      audioRef.current.onloadeddata = null;
    };
    
  }, [setAudioCurrentTime, setPlaying]);
  
  const playAudio = React.useCallback((params: { startTime?: number } = {}) => {
    const { startTime } = params;
    if (isNumber(startTime)) {
      setAudioCurrentTime(startTime);
      setCurrentTime(startTime);
    }
    
    setPlaying();
  }, [setPlaying, setAudioCurrentTime]);

  const stopAudio = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setAudioCurrentTime(0);
    setCurrentTime(0);
    setAudioId(null);
  }, [setAudioCurrentTime]);
  
  const pauseAudio = React.useCallback(() => {
    setAudioCurrentTime(audioRef.current.currentTime);
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [setAudioCurrentTime]);

  const handleDragChange = React.useCallback(({ isDragging, dragTime }: AudioSliderDragParams) => {
    setIsDragging(isDragging);
    setDragTime(dragTime);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentTime,
        activeAudioId: audioId,
        isPlaying,
        startAudio,
        playAudio,
        pauseAudio,
        stopAudio,
        onDragChange: handleDragChange,
        isDragging,
        dragTime,
      }}
    >
      {children}
      
      <audio
        ref={audioRef}
        src={url || ''}
        autoPlay={false}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
      />

    </AudioContext.Provider>
  );
};

export const useAudio = () => React.useContext(AudioContext);