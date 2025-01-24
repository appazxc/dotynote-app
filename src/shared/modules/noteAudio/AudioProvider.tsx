import isNumber from 'lodash/isNumber';
import React from 'react';

import { selectAudioUrl } from 'shared/modules/noteAudio/audioSelectors';
import { useAppSelector } from 'shared/store/hooks';

type AudioContext = {
  activeAudioId: string | null,
  isPlaying: boolean,
  currentTime: number,
  startAudio: (params: { audioId: string, startTime?: number }) => void,
  playAudio: (params: { startTime?: number }) => void,
  pauseAudio: () => void,
}

const AudioContext = React.createContext<AudioContext>(null!);

export const AudioProvider = ({ children }) => {
  const [audioId, setAudioId] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
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
    };
    
  }, [setAudioCurrentTime, setPlaying]);
  
  const playAudio = React.useCallback(({ startTime }: { startTime?: number }) => {
    if (isNumber(startTime)) {
      setAudioCurrentTime(startTime);
      setCurrentTime(startTime);
    }
    
    setPlaying();
  }, [setPlaying, setAudioCurrentTime]);
  
  const pauseAudio = React.useCallback(() => {
    setAudioCurrentTime(audioRef.current.currentTime);
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [setAudioCurrentTime]);

  return (
    <AudioContext.Provider
      value={{
        currentTime,
        activeAudioId: audioId,
        isPlaying,
        startAudio,
        playAudio,
        pauseAudio,
      }}
    >
      {children}
      {children}
      
      <audio
        ref={audioRef}
        src={url || ''}
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