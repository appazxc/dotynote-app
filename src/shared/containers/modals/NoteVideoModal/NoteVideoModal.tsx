import { modalIds } from 'shared/constants/modalIds';
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
})(() => import('./NoteVideoModal.content'));
