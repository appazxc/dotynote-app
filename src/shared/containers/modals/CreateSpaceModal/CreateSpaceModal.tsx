import { modalIds } from 'shared/constants/modalIds';
import asModal, { GetModalParamsType } from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';
import { ModalProps } from 'shared/types/modal';

import { Props } from './CreateSpaceModal.content';

const getModalParams: GetModalParamsType<ModalProps<Props>> = () => ({
  id: modalIds.createSpace,
});

export default asModal<ModalProps<Props>>({ 
  getModalParams, 
  modalLoader: <ModalLoader />, 
})(() => import('./CreateSpaceModal.content'));
