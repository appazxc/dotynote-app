import { loadVideoUrl } from 'shared/actions/note/loadVideoUrl';
import { modalIds } from 'shared/constants/modalIds';
import { hour } from 'shared/constants/time';
import asModal from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';

import { Props } from './NoteVideoModal.content';

const getModalParams = (props: Props) => ({
  id: modalIds.noteVideo,
  extraId: props.videoId + props.extraId,
});

export default asModal<Props>({ 
  getModalParams, 
  modalLoader: <ModalLoader />, 
  loader: async ({ videoId, noteId }, dispatch) => {
    await dispatch(loadVideoUrl(noteId, videoId, hour * 4));
  },
})(() => import('./NoteVideoModal.content'));
