import React from 'react';

import { selectActiveAudio } from 'shared/selectors/selectActiveAudio';
import { useAppSelector } from 'shared/store/hooks';

import { SpaceNoteAudioWidget } from 'desktop/modules/space/components/SpaceAudioWidget/SpaceNoteAudioWidget';

export const SpaceAudioWidget = React.memo(() => {
  const audio = useAppSelector(selectActiveAudio);
  
  if (!audio) {
    return null;
  }

  return (
    <SpaceNoteAudioWidget audio={audio} />
  );
});
