import { MediaPlayer, MediaProvider, Poster, VideoMimeType } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import React from 'react';

import { getAspectRatio } from 'shared/util/getAspectRatio';

type Props = {
  url?: string;
  posterUrl?: string;
  width: number;
  height: number;
  mimeType: VideoMimeType;
};

export const VideoPlayer = React.memo((props: Props) => {
  const { url, posterUrl, width, height, mimeType } = props;
  const aspectRatio = getAspectRatio(width, height);

  return (
    <MediaPlayer
      autoPlay={true}
      title="Sprite Fight"
      src={{ src: url!, type: mimeType }}
      aspectRatio={aspectRatio}
    >
      <MediaProvider>
        <Poster
          className="vds-poster"
          src={posterUrl}
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
      </MediaProvider>
      <PlyrLayout 
        controls={['play', 'progress', 'current-time', 'mute+volume', 'fullscreen']}
        icons={plyrLayoutIcons}
      />
    </MediaPlayer>
  );
});
