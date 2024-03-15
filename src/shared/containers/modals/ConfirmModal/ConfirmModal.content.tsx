import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { ModalBase } from 'shared/types/modal';

export type Props = ModalBase<{
  title: string,
  description: string,
  isLoading?: boolean,
  onConfirm: () => void,
}>

const ConfirmModal = (props: Props) => {
  const { title, description, isOpen = true, isLoading, onConfirm } = props;
  const dispatch = useAppDispatch();
  
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            variant="ghost"
            mr={3}
            onClick={() => dispatch(hideModal())}
          >
            Close
          </Button>
          <Button
            colorScheme="brand"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;