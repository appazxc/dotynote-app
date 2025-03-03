import { Box } from '@chakra-ui/react';
import { 
  isHLSProvider,
  MediaCanPlayDetail,
  MediaCanPlayEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  Poster, 
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

const None = () => null;

type Props = {
  url?: string;
  posterUrl?: string;
  width: number;
  height: number;
  title?: string;
  mimeType: VideoMimeType;
};

export const VideoPlayer = React.memo((props: Props) => {
  const { url = '', posterUrl, width, height, title, mimeType } = props;
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
    // ...
  }

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
        // src={url}
        posterLoad="visible"
        aspectRatio={aspectRatio}
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        // fullscreenOrientation=''
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
