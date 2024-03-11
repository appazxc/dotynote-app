import React from 'react';

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
import { noteSelector, postSettingsSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

export type Props = {
  noteId: IdentityType,
}

const EditPostSettingsModal = ({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const postSettings = useAppSelector(state => postSettingsSelector.getById(state, note?.postSettingsId));

  invariant(postSettings, 'Missing postSettings');

  // const { mutate }

  const handleSubmit = React.useCallback(() => {

  }, []);
  
  return (
    <Modal
      isCentered
      isOpen
      size="2xl"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit posts settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {JSON.stringify(postSettings, null, 2)}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="brand"
            variant="ghost"
            mr={3}
            onClick={() => dispatch(hideModal())}
          >
              Close
          </Button>
          <Button colorScheme="brand" onClick={handleSubmit}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPostSettingsModal;