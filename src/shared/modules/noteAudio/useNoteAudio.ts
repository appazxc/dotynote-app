import React from 'react';
import { useAudioPlayerContext } from 'react-use-audio-player';

import { handleAudioEnd } from 'shared/actions/audio/handleAudioEnd';
import { getAudioWithUrl } from 'shared/actions/note/getAudioWithUrl';
import { setActiveAudioId } from 'shared/modules/noteAudio/audioSlice';
import { noteAudioSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { getAudioTime } from 'shared/util/audio/getAudioTime';
import { removeAudioTime } from 'shared/util/audio/removeAudioTime';
import { saveAudioTime } from 'shared/util/audio/saveAudioTime';

export const useNoteAudio = (audioId?: string | null) => {
  const audio = useAppSelector(state => noteAudioSelector.getById(state, audioId));
  const dispatch = useAppDispatch();
  const [isUrlLoading, setIsUrlLoading] = React.useState(false);

  const { 
    src, 
    error,

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

    stop: stopAudio,
    pause,
    seek,

    getPosition,
  } = useAudioPlayerContext();

  const isActive = src === audio?.url && !isStopped;
  const isPlaying = isActive && (isAudioPlaying || (isAudioLoading && isPaused));
  const isLoading = isUrlLoading || (isActive && isAudioLoading);

  const start = React.useCallback((audioId?: string | null) => {
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
        autoplay: false,
        format: newAudio.extension,
        html5: true,
        onstop: () => {
          // console.log('onstop', audioId );
        },
        onpause: () => {
          saveAudioTime(audioId, getPosition());
        },
        onload: () => {
          const time = getAudioTime(audioId);

          if (time) {
            // instant seek in "onload" not working. In "onplay" seek do bad sound expirience with audio jump.
            setTimeout(() => {
              seek(time);
              playAudio();
            }, 50);
          } else {
            playAudio();
          }
        },
        onend: () => {
          dispatch(handleAudioEnd({ audioId, start }));
        },
        onplay: () => {
          // console.log('onplay', audioId );
        },
      });
    });
  }, [dispatch, load, audio?.url, seek, playAudio, getPosition]);

  const play = React.useCallback(() => {
    if (isActive) {
      playAudio();
    } else {
      start(audioId);
    }
  }, [isActive, playAudio, start, audioId]);
  
  const stop = React.useCallback(() => {
    stopAudio();
    dispatch(setActiveAudioId(null));
  }, [stopAudio, dispatch]);

  const togglePlayPause = React.useCallback(() => {
    if (isActive) {
      toggleAudioPlayPause();
    } else {
      start(audioId);
    }
  }, [isActive, audioId, start, toggleAudioPlayPause]);

  return {
    audio,
    isActive,
    isPlaying,
    isLoading,
    seek,
    play,
    pause,
    stop,
    error,
    togglePlayPause,
    getPosition,
  };
};