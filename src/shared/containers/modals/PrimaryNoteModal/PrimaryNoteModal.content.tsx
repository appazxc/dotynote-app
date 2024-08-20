import React from 'react';

import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { useBrowserRouter } from 'shared/components/BrowserRouterProvider';
import { apos } from 'shared/constants/htmlCodes';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startPrimaryNoteOperation } from 'shared/store/slices/appSlice';

import exampleDesktop from './exampleDesktop.png';
import exampleMobile from './exampleMobile.png';

export type Props = {}

const PrimaryNoteModal = React.memo(() => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);
  const { navigate } = useBrowserRouter();
  
  const handleConfirm = React.useCallback(() => {
    dispatch(startPrimaryNoteOperation());
    dispatch(hideModal());

    if (isMobile) {
      navigate({ to: '/app' });
    }
  }, [dispatch, navigate, isMobile]);

  return (
    <Modal
      isCentered={!isMobile}
      isOpen
      size={isMobile ? 'full' : 'xl'}
      scrollBehavior="inside"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign primary note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="4">
            You don{apos}t have a primary note assigned. To do this, find the note and select it as the primary one.
          </Text>
          <Box
            p="4"
            bg="gray.100"
            borderRadius="md"
          >
            <img src={isMobile ? exampleMobile : exampleDesktop} alt="" />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="brand" onClick={handleConfirm}>Assign</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default PrimaryNoteModal;