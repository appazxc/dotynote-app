import { modalIds } from 'shared/constants/modalIds';
import asModal from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';

import { Props } from './NotImplementedBillingModal.content';

const getModalParams = () => ({
  id: modalIds.notImplementedBilling,
});

export default asModal<Props>({ 
  getModalParams, 
  modalLoader: <ModalLoader />, 
})(() => import('./NotImplementedBillingModal.content'));
