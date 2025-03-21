import isNumber from 'lodash/isNumber';
import React from 'react';
import { useAudioPlayerContext } from 'react-use-audio-player';

import { getAudioWithUrl } from 'shared/actions/note/getAudioWithUrl';
import { loadAudioUrl } from 'shared/actions/note/loadAudioUrl';
import { selectAudioUrl } from 'shared/modules/noteAudio/audioSelectors';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export type AudioSliderDragParams = { isDragging: boolean; currentTimePos: number };

type AudioContext = {
  activeAudioId: string | null;
  isPlaying: boolean;
  isDragging: boolean;
  currentTime: number;
  currentTimePos: number;
  startAudio: (params: { audioId: string; startTime?: number }) => void;
  playAudio: (params?: { startTime?: number }) => void;
  pauseAudio: () => void;
  stopAudio: () => void;
  changeCurrentTime: (time: number) => void;
  onDragChange: (params: AudioSliderDragParams) => void;
}

const AudioContext = React.createContext<AudioContext>(null!);

export const AudioProvider = ({ children }) => {
  const { load } = useAudioPlayerContext();
  const [audioId, setAudioId] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [currentTimePos, setCurrentTimePos] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const url = useAppSelector(state => selectAudioUrl(state, audioId));
  const audioRef = React.useRef(new Audio()); 
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (audioId && !url) {
      dispatch(loadAudioUrl(audioId));
    }
  }, [dispatch, audioId, url]);

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
    } else {
      audioRef.current.currentTime = currentTime;
    }
    
    setPlaying();
  }, [setPlaying, setAudioCurrentTime, currentTime]);

  const startAudioNew = React.useCallback(({ audioId, startTime = 0 }) => {
    dispatch(getAudioWithUrl(audioId)).then((audio) => {
      if (!audio?.url) {
        return;
      }

      load(audio.url, {
        autoplay: true,
        format: audio.extension,
        html5: true,
        onstop: () => {
          console.log('onstop', audioId );
        },
        /** Callback that will be triggered when the audio is paused */
        onpause: () => {
          console.log('onpause', audioId );
        },
        /** Callback that will be triggered when the audio is successfully loaded */
        onload: () => {
          console.log('onload', audioId );
        },
        /** Callback that will be triggered when the audio reaches its end */
        onend: () => {
          console.log('onend', audioId );
        },
        /** Callback that will be triggered when the audio starts playing */
        onplay: () => {
          console.log('onplay', audioId );
        },
      });
    });
  }, [dispatch, load]);

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

  const handleDragChange = React.useCallback(({ isDragging, currentTimePos }: AudioSliderDragParams) => {
    setIsDragging(isDragging);
    setCurrentTimePos(currentTimePos);
  }, []);

  const handleChangeCurrentTime = React.useCallback((time: number) => {
    setAudioCurrentTime(time);
    setCurrentTime(time);
  }, [setAudioCurrentTime]);

  return (
    <AudioContext.Provider
      value={{
        currentTime,
        activeAudioId: audioId,
        isPlaying,
        startAudio: startAudioNew,
        playAudio,
        pauseAudio,
        stopAudio,
        onDragChange: handleDragChange,
        isDragging,
        currentTimePos,
        changeCurrentTime: handleChangeCurrentTime,
      }}
    >
      {children}
      
      {url && (
        <audio
          ref={audioRef}
          src={url}
          autoPlay={false}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => {
            setIsPlaying(true);
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
          onError={(event) => {
            const audioElement = event.target as HTMLAudioElement;
            const PIPELINE_ERROR_READ = 2;

            if (audioElement.error?.code === PIPELINE_ERROR_READ && audioId) {
              dispatch(loadAudioUrl(audioId));
            }
          }}
        />
      )}
      
    </AudioContext.Provider>
  );
};

export const useAudio = () => React.useContext(AudioContext);