import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { PiSticker } from 'react-icons/pi';
import { TbArrowMoveLeft } from 'react-icons/tb';

import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { useDeleteNotesFromPosts } from 'shared/api/hooks/useDeleteNotesFromPosts';
import { useUnstickPosts } from 'shared/api/hooks/useUnstickPosts';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { Operation } from 'shared/modules/noteTab/components/Operations/Operation';
import { OperationWrapper } from 'shared/modules/noteTab/components/Operations/OperationWrapper';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  SelectOperation as SelectOperationType,
  startMoveOperation,
  startStickOperation,
  stopOperation,
} from 'shared/store/slices/appSlice';

type Props = SelectOperationType;

const deleteNotesExtraId = 'deleteSelectedNotes';

export const SelectOperation = React.memo((props: Props) => {
  const { postIds, noteIds, parentId } = props;
  const note = useTabNote();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => postSelector.getByIds(state, postIds));
  const notes = useAppSelector(state => noteSelector.getByIds(state, noteIds));
  
  const { mutate: deletePosts } = useDeleteNotesFromPosts(parentId);
  const { mutate: unstick } = useUnstickPosts(parentId, postIds);
  const { mutate: deleteNotes } = useDeleteNotes();
 
  if (note.id !== parentId) {
    return null;
  }

  const handleClose = () => {
    dispatch(stopOperation());
  };

  const isNotesSelecting = noteIds.length > 0;
  
  const canStick = isNotesSelecting 
    ? notes.every((note) => note.permissions.stick) 
    : posts.every((post) => post.permissions.stick);
  const canUnstick = !isNotesSelecting && posts.every((post) => post.permissions.unstick);
  const canMove = !isNotesSelecting && posts.every((post) => post.permissions.move);
  const canDelete = isNotesSelecting
    ? notes.every((note) => note.permissions.delete) 
    : posts.every((post) => post.permissions.delete);

  const list = [
    ...canStick ? [{
      label: 'Stick',
      icon: <PiSticker />,
      onClick: () => dispatch(startStickOperation({
        fromNoteId: note.id,
        postIds: posts.map((post) => post.id),
        noteIds,
      })),
    }] : [],
    ...canMove ? [{
      label: 'Move',
      icon: <TbArrowMoveLeft />,
      onClick: () => {
        dispatch(startMoveOperation({
          fromNoteId: note.id,
          postIds,
        }));
      },
    }] : [],
    ...canUnstick ? [{
      label: 'Unstick',
      icon: <Box display="flex" transform="rotate(180deg)"><PiSticker /></Box>,
      onClick: () => {
        dispatch(stopOperation());

        unstick();
      },
    }] : [],
    ...canDelete ? [{
      label: 'Delete',
      icon: <AiOutlineDelete />,
      onClick: () => {
        dispatch(showModal({ id: modalIds.confirm, extraId: deleteNotesExtraId }));
      },
    }] : [],
  ];

  if (!list.length) {
    return (
      <Operation
        title={`You cannot do anything with this ${isNotesSelecting ? 'notes' : 'posts'}`}
      />
    );
  }

  return (
    <>
      <OperationWrapper onClose={handleClose}>
        <Box
          display="flex"
          gap={isMobile ? '2' : '4'}
          px={isMobile ? '1' : '2'}
          alignItems="center"
          justifyContent={isMobile ? 'space-around' : undefined}
        >
          {!isMobile && <Text fontWeight="600" fontSize="sm">Actions:</Text>}
          {list.map(({ label, icon, onClick }) => {
            return (
              <Box
                key={label}
                display="flex"
                flexDirection={isMobile ? 'column' : 'column'}
                alignItems="center"
                gap="2"
                _hover={{
                  bg: 'gray.100',
                }}
                px="2"
                py="1"
                borderRadius="md"
                transition="all 0.3s"
                cursor="pointer"
                fontSize="lg"
                onClick={onClick}
              >
                {icon}
                <Text fontWeight="600" fontSize="2xs">{label}</Text>
              </Box>
            );
          })}
        </Box>
      </OperationWrapper>
      <ConfirmModal
        title="This action can't be undone"
        description="Delete selected notes?"
        confirmText="Delete"
        extraId={deleteNotesExtraId}
        onConfirm={() => {
          dispatch(hideModal());
          if (isNotesSelecting) {
            deleteNotes(noteIds);
          } else {
            deletePosts(postIds);
          }
          dispatch(stopOperation());
        }}
      />
    </>
  );
});
