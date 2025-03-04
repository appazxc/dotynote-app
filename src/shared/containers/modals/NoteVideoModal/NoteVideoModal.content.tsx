import React from 'react';

import { NoteVideoModalDesktop } from 'shared/containers/modals/NoteVideoModal/NoteVideoModalDesktop';
import { NoteVideoModalMobile } from 'shared/containers/modals/NoteVideoModal/NoteVideoModalMobile';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { noteVideoSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export type Props = {
  noteId: number;
  videoId: string;
  extraId?: number | string;
}

const NoteVideoModal = (props: Props) => {
  const { noteId, videoId } = props;
  const isMobile = useIsMobile();
  const noteVideo = useAppSelector(state => noteVideoSelector.getEntityById(state, videoId));

  invariant(noteVideo, 'Note video is missing');
  console.log('isMobile', isMobile);
  if (isMobile) {
    return <NoteVideoModalMobile noteId={noteId} noteVideo={noteVideo} />;
  }

  return <NoteVideoModalDesktop noteId={noteId} noteVideo={noteVideo} />;
};

export default React.memo(NoteVideoModal);