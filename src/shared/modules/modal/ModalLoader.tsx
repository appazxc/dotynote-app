import { Box, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { Loader } from 'shared/components/Loader';
import { Wait } from 'shared/components/Wait';
import { useAppDispatch } from 'shared/store/hooks';

import { hideModal } from './modalSlice';

type Props = {
  delay?: number,
}

export const ModalLoader = ({ delay }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <Wait delay={delay ?? 300}>
      <Modal
        isCentered
        isOpen
        onClose={() => dispatch(hideModal())}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box p="4">
              <Loader delay={0} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wait>
  );
};
