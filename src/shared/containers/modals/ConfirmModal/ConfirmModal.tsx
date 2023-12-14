import { Loadable } from 'shared/components/Loadable';
import { modalIds } from 'shared/constants/modalIds';
import asModal, { GetModalParamsType } from 'shared/modules/modal/asModal';
import { ModalLoader } from 'shared/modules/modal/ModalLoader';
import { ModalProps } from 'shared/types/modal';
import { wait } from 'shared/util/wait';

import { Props } from './ConfirmModal.content';

const getModalParams: GetModalParamsType<ModalProps<Props>> = (props) => ({
  id: modalIds.confirm,
  modalKey: props.modalKey,
  loader: async () => {
    await wait(1000);
  },
});

export default asModal<ModalProps<Props>>(getModalParams, <ModalLoader />)(Loadable(
  () => import('./ConfirmModal.content')
));
