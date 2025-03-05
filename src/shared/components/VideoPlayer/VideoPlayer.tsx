import { Box } from '@chakra-ui/react';
import { 
  isHLSProvider,
  MediaCanPlayDetail,
  MediaCanPlayEvent,
  MediaOrientationChangeEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  Poster, 
  ScreenOrientationChangeEventDetail, 
  ScreenOrientationLockType, 
  useMediaStore, 
  VideoMimeType, 
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
  DefaultAudioLayout,
  DefaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import React, { useRef } from 'react';
import './player.css';

import { getAspectRatio } from 'shared/util/getAspectRatio';

import { useOrientation } from '@uidotdev/usehooks';

const None = () => null;

type Props = {
  url?: string;
  posterUrl?: string;
  width: number;
  height: number;
  title?: string;
  autoFullscreen?: boolean;
  isVideoHorizontal?: boolean;
  fullscreenOrientation?: ScreenOrientationLockType;
  onFullScreenChange?: (isFullScreen: boolean) => void;
  mimeType: VideoMimeType;
};

export const VideoPlayer = React.memo((props: Props) => {
  const { 
    url = '',
    posterUrl,
    width,
    height,
    title,
    autoFullscreen,
    onFullScreenChange,
    mimeType,
    isVideoHorizontal,
    orientation,
  } = props;
  const aspectRatio = getAspectRatio(width, height);
  const player = useRef<MediaPlayerInstance>(null);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    player.current?.remoteControl.unlockScreenOrientation();
  }

  React.useEffect(() => {
    async function enterFullscreen() {
      if (!player.current || !autoFullscreen) {
        return;
      }
      try {
        await player.current.enterFullscreen();
      } catch (e) {
        // This will generally throw if:
        // 1. Fullscreen API is not available.
        // 2. Or, the user has not interacted with the document yet.
      }
    }

    enterFullscreen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customIcons: DefaultLayoutIcons = {
    ...defaultLayoutIcons,
    GoogleCastButton: {
      Default: None,
      Connecting: None,
      Connected: None,
    },
    PIPButton: {
      Enter: None,
      Exit: None,
    },
  };

  const css = React.useMemo(() => ({
    '& .vds-pip-button, & .vds-google-cast-button': {
      display: 'none',
    },
  }), []);

  function onOrientationChange(
    { orientation, lock }: ScreenOrientationChangeEventDetail,
    nativeEvent: MediaOrientationChangeEvent
  ) {
    // ...
  }
  
  return (
    <Box
      asChild
      css={css}
    >
      <MediaPlayer
        ref={player}
        crossOrigin
        playsInline
        autoPlay
        className="player"
        title={title}
        src={{ src: url, type: mimeType }}
        posterLoad="eager"
        fullscreenOrientation={orientation}
        aspectRatio={aspectRatio}
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        onFullscreenChange={onFullScreenChange}
        onOrientationChange={onOrientationChange}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={posterUrl}
          />
        </MediaProvider>
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout
          icons={customIcons}
          smallLayoutWhen={({ width, height }) => width < 576 || height < 360}
          noAudioGain={true}
        />
      </MediaPlayer>
    </Box>

  );
});
