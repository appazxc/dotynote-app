import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  title: string,
  description: string,
  onConfirm: () => void,
}

const ConfirmModal = (props: Props) => {
  const { title, description, onConfirm } = props;
  const dispatch = useAppDispatch();
  
  return (
    <Modal
      isCentered
      isOpen
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {description}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='brand'
            variant="ghost"
            mr={3}
            onClick={() => dispatch(hideModal())}
          >
              Close
          </Button>
          <Button colorScheme='brand' onClick={onConfirm}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;