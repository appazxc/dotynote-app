import { modalIds } from 'shared/constants/modalIds';
import asModal, { GetModalParamsType } from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';
import { ModalProps } from 'shared/types/modal';

import { Props } from './InsufficientCreditsModal.content';

const getModalParams: GetModalParamsType<ModalProps<Props>> = (props) => ({
  id: modalIds.insufficientCredits,
  ...props,
});

export default asModal<ModalProps<Props>>({
  getModalParams,
  modalLoader: <ModalLoader />,
})(() => import('./InsufficientCreditsModal.content')); 