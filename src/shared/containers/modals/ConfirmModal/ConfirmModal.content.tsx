import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';

import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { ModalBase } from 'shared/types/modal';

export type Props = ModalBase<{
  title: string,
  description: string,
  isLoading?: boolean,
  confirmText?: string,
  onConfirm: () => void,
}>

const ConfirmModal = (props: Props) => {
  const { title, description, isOpen = true, isLoading, confirmText, onConfirm } = props;
  const dispatch = useAppDispatch();
  const borderColor = useColorModeValue('gray.100', 'brand.400');

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => dispatch(hideModal())}
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          pb="1"
          px="4"
          textAlign="center"
          fontSize="md"
        >
          {title}
        </ModalHeader>
        <ModalBody px="4" textAlign="center">{description}</ModalBody>
        <ModalFooter
          p="0"
          borderTop="1px solid"
          borderColor={borderColor}
          mt="4"
        >
          <Button
            variant="ghost"
            width="50%"
            borderRadius="0"
            borderBottomLeftRadius="md"
            onClick={() => dispatch(hideModal())}
          >
            Close
          </Button>
          <Button
            width="50%"
            borderRadius="0"
            borderBottomRightRadius="md"
            colorScheme="brand"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText || 'Confirm'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;