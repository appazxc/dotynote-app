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

import { useDeletePostsSettings } from 'shared/api/hooks/useDeletePostSettings';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { modalIds } from 'shared/constants/modalIds';
import { hideModal, hideModals, showModal } from 'shared/modules/modal/modalSlice';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { noteSelector, postsSettingsSelector } from 'shared/selectors/entities';
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
  const postsSettings = useAppSelector(state => postsSettingsSelector.getById(state, note?.postsSettingsId));
  const isMobile = useAppSelector(selectIsMobile);

  invariant(postsSettings, 'Missing postsSettings');

  const { mutate: deletePostsSettings, isPending } = useDeletePostsSettings(noteId);

  const handleConfirmDelete = React.useCallback(() => {
    deletePostsSettings(null, { 
      onSuccess: () => {
        dispatch(hideModals());
        const queryOptions = options.notes.load(noteId);
        queryClient.invalidateQueries({ queryKey: queryOptions.queryKey });
        queryClient.fetchQuery(queryOptions);
      }, 
    });
  }, [dispatch, noteId, deletePostsSettings]);
  
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        size={isMobile ? 'full' : 'xl'}
        onClose={() => dispatch(hideModal())}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit posts settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {JSON.stringify(postsSettings, null, 2)}
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button
              colorScheme="red"
              variant="ghost"
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