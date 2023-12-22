import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';

import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  title: string,
  description: string,
}

const InfoModal = (props: Props) => {
  const { title, description } = props;
  const dispatch = useAppDispatch();
  
  return (
    <Modal
      isCentered
      isOpen
      size="xs"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb="1">{title}</ModalHeader>
        <ModalBody>
          {description}
        </ModalBody>

        <ModalFooter
          p="0"
          borderTop="1px solid"
          borderColor="gray.100"
          mt="4"
        >
          <Button
            width="full"
            colorScheme="brand"
            variant="ghost"
            onClick={() => dispatch(hideModal())}
          >
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;