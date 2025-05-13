import { modalIds } from 'shared/constants/modalIds';
import asModal, { GetModalParamsType } from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';
import { ModalProps } from 'shared/types/modal';

import { Props } from './NoteFiltersModal.content';

const getModalParams: GetModalParamsType<ModalProps<Props>> = (props) => ({
  id: modalIds.noteFilters,
  extraId: props.extraId,
});

export default asModal<Props>({ 
  getModalParams, 
  modalLoader: <ModalLoader />, 
})(() => import('./NoteFiltersModal.content'));
