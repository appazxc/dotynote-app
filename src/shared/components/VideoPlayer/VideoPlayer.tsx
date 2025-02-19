import { MediaPlayer, MediaProvider, VideoMimeType } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import React from 'react';

import { getAspectRatio } from 'shared/util/getAspectRatio';

type Props = {
  url?: string,
  width: number,
  height: number,
  mimeType: VideoMimeType,
};

export const VideoPlayer = React.memo((props: Props) => {
  const { url, width, height, mimeType } = props;
  const aspectRatio = getAspectRatio(width, height);

  return (
    <MediaPlayer
      title="Sprite Fight"
      src={{ src: url!, type: mimeType }}
      aspectRatio={aspectRatio}
      load="play"      
    >
      <MediaProvider />
      <PlyrLayout 
        controls={['play', 'progress', 'current-time', 'mute+volume', 'fullscreen']}
        icons={plyrLayoutIcons}
      />
    </MediaPlayer>
  );
});
