import React from 'react';

import { Box, Text } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { PiSticker } from 'react-icons/pi';
import { TbArrowMoveLeft } from 'react-icons/tb';

import { useDeletePostNotes } from 'shared/api/hooks/useDeletePostNotes';
import { useRemovePosts } from 'shared/api/hooks/useRemovePosts';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { Operation } from 'shared/modules/noteTab/components/Operations/Operation';
import { OperationWrapper } from 'shared/modules/noteTab/components/Operations/OperationWrapper';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { postSelector } from 'shared/selectors/entities';
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
  const { postIds, noteId } = props;
  const note = useTabNote();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => postSelector.getByIds(state, postIds));

  const { mutate: deleteNotes } = useDeletePostNotes(noteId);
  
  const {
    mutate: unstick,
  } = useRemovePosts(postIds);
 
  if (note.id !== noteId) {
    return null;
  }

  const handleClose = () => {
    dispatch(stopOperation());
  };
  
  const canStick = posts.every((post) => post.permissions.stick);
  const canRemove = posts.every((post) => post.permissions.remove);
  const canMove = posts.every((post) => post.permissions.move);
  const canDelete = posts.every((post) => post.permissions.delete);

  const list = [
    ...canStick ? [{
      label: 'Stick to',
      icon: <PiSticker />,
      onClick: () => dispatch(startStickOperation({
        fromNoteId: note.id,
        postIds: posts.map((post) => post.id),
      })),
    }] : [],
    ...canMove ? [{
      label: 'Move to',
      icon: <TbArrowMoveLeft />,
      onClick: () => {
        dispatch(startMoveOperation({
          fromNoteId: note.id,
          postIds,
        }));
      },
    }] : [],
    ...canRemove ? [{
      label: 'Remove',
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
        title="You cannot do anything with this posts"
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
        >
          {!isMobile && <Text fontWeight="600" fontSize="sm">Actions:</Text>}
          {list.map(({ label, icon, onClick }) => {
            return (
              <Box
                key={label}
                display="flex"
                flexDirection="row"
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
                onClick={onClick}
              >
                {icon}
                <Text fontWeight="600" fontSize="xs">{label}</Text>
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
          deleteNotes(postIds);
          dispatch(stopOperation());
        }}
      />
    </>
  );
});
