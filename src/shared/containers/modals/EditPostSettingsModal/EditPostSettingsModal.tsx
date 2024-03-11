import { modalIds } from 'shared/constants/modalIds';
import asModal, { GetModalParamsType } from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';
import { ModalProps } from 'shared/types/modal';

import { Props } from './EditPostSettingsModal.content';

const getModalParams: GetModalParamsType<ModalProps<Props>> = (props) => ({
  id: modalIds.editPostSettings,
  extraId: props.extraId,
});

export default asModal<ModalProps<Props>>({ 
  getModalParams, 
  modalLoader: <ModalLoader />, 
})(() => import('./EditPostSettingsModal.content'));
