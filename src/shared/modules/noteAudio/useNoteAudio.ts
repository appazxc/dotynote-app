import React from 'react';
import { useAudioPlayerContext } from 'react-use-audio-player';

import { getAudioWithUrl } from 'shared/actions/note/getAudioWithUrl';
import { setActiveAudioId } from 'shared/modules/noteAudio/audioSlice';
import { noteAudioSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export const useNoteAudio = (audioId: string) => {
  const audio = useAppSelector(state => noteAudioSelector.getById(state, audioId));
  const dispatch = useAppDispatch();
  const [isUrlLoading, setIsUrlLoading] = React.useState(false);

  const { 
    src, 

    play: playAudio,
    togglePlayPause: toggleAudioPlayPause,

    load, 

    isPlaying: isAudioPlaying,
    isLoading: isAudioLoading,
    
    isPaused,
    isStopped,
    // isLooping,
    // isMuted,
    // isReady,
    // isUnloaded,

    pause,
    seek,
  } = useAudioPlayerContext();

  const isActive = src === audio?.url && !isStopped;
  const isPlaying = isActive && (isAudioPlaying || (isAudioLoading && isPaused));
  const isLoading = isUrlLoading || (isActive && isAudioLoading);

  const startAudio = React.useCallback(() => {
    if (!audioId) {
      return;
    }
    
    if (!audio?.url) {
      setIsUrlLoading(true);
    }

    dispatch(getAudioWithUrl(audioId)).then((newAudio) => {
      if (!newAudio?.url) {
        return;
      }

      if (audio?.url !== newAudio.url) {
        setIsUrlLoading(false);
      }
      
      dispatch(setActiveAudioId(audioId));

      load(newAudio.url, {
        autoplay: true,
        format: newAudio.extension,
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
          dispatch(setActiveAudioId(null));
        },
        /** Callback that will be triggered when the audio starts playing */
        onplay: () => {
          console.log('onplay', audioId );
        },
      });
    });
  }, [dispatch, audioId, load, audio?.url]);

  const play = React.useCallback(() => {
    if (isActive) {
      playAudio();
    } else {
      startAudio();
    }
  }, [isActive, playAudio, startAudio]);
  
  const togglePlayPause = React.useCallback(() => {
    if (isActive) {
      toggleAudioPlayPause();
    } else {
      startAudio();
    }
  }, [isActive, startAudio, toggleAudioPlayPause]);

  return {
    audio,
    isActive,
    isPlaying,
    isLoading,
    seek,
    play,
    pause,
    togglePlayPause,
  };
};