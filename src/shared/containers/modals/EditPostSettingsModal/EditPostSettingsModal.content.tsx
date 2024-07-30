import React from 'react';

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useDeletePostSettings } from 'shared/api/hooks/useDeletePostSettings';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { modalIds } from 'shared/constants/modalIds';
import { hideModal, hideModals, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector, postSettingsSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { ModalBase } from 'shared/types/modal';
import { invariant } from 'shared/util/invariant';

import { ConfirmModal } from '../ConfirmModal';

export type Props = ModalBase<{
  noteId: number,
}>

const EditPostSettingsModal = ({ noteId, isOpen = true }: Props) => {
  const dispatch = useAppDispatch();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const postSettings = useAppSelector(state => postSettingsSelector.getById(state, note?.postSettingsId));

  invariant(postSettings, 'Missing postSettings');

  const { mutate: deletePostSettings, isPending } = useDeletePostSettings(noteId);

  const handleConfirmDelete = React.useCallback(() => {
    deletePostSettings(null, { 
      onSuccess: () => {
        dispatch(hideModals());
        const queryOptions = options.notes.load(noteId);
        queryClient.invalidateQueries({ queryKey: queryOptions.queryKey });
        queryClient.fetchQuery(queryOptions);
      }, 
    });
  }, [dispatch, noteId, deletePostSettings]);
  
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
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

          <ModalFooter justifyContent="space-between">
            <Button
              colorScheme="red"
              variant="solid"
              onClick={() => dispatch(showModal({ id: modalIds.confirm, extraId: 'EditPostSettingsModal' }))}
            >
              Delete posts
            </Button>
            <HStack>
              <Button
                colorScheme="brand"
                variant="ghost"
                mr={3}
                onClick={() => dispatch(hideModal())}
              >
                Close
              </Button>
              <Button colorScheme="brand" onClick={() => {}}>Save</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmModal
        title="Confirm delete posts settings"
        description="All notes sticked only here will be deleted too"
        extraId="EditPostSettingsModal"
        isLoading={isPending}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default EditPostSettingsModal;