import {
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { 
  DialogBackdrop,
  DialogRoot, 
  DialogContent,
  DialogFooter,
  DialogHeader, 
  DialogCloseTrigger,
  DialogBody,
} from 'shared/components/ui/dialog';
import { apos } from 'shared/constants/htmlCodes';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
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
  const navigate = useBrowserNavigate();
  
  const handleConfirm = React.useCallback(() => {
    dispatch(startPrimaryNoteOperation());
    dispatch(hideModal());

    if (isMobile) {
      navigate({ to: '/app' });
    }
  }, [dispatch, navigate, isMobile]);

  return (
    <DialogRoot
      defaultOpen
      placement={!isMobile ? 'center' : undefined}
      size={isMobile ? 'full' : 'xl'}
      scrollBehavior="inside"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>Assign primary note</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <Button colorScheme="brand" onClick={handleConfirm}>Assign</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
});

export default PrimaryNoteModal;