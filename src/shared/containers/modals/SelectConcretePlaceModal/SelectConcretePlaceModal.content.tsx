import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { useMovePosts } from 'shared/api/hooks/useMovePosts';
import { useStickNotes } from 'shared/api/hooks/useStickNotes';
import { queryClient } from 'shared/api/queryClient';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { stopOperation } from 'shared/store/slices/appSlice';
import { ModalBase } from 'shared/types/modal';
import { invariant } from 'shared/util/invariant';

export type Props = ModalBase<{
  noteId: number,
}>

const SelectConcretePlaceModal = (props: Props) => {
  const { noteId, isOpen = true } = props;
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);

  const { mutateAsync: move, isPending: isPendingMove } = useMovePosts();
  const { mutateAsync: stick, isPending: isPendingStick } = useStickNotes();

  invariant(operation.type, 'Operation type is empty in SelectConcretePlaceModal');

  const handleClick = (place: 'top' | 'bottom') => async () => {
    if (operation.type === 'move') {
      await move({
        parentId: noteId,
        fromNoteId: operation.fromNoteId,
        postIds: operation.postIds,
        concretePostId: operation.concretePostId,
        place,
      });

      if (operation.fromNoteId !== noteId)
        queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(operation.fromNoteId).slice(0, 2) });
    }

    if (operation.type === 'stick') {
      await stick({
        parentId: noteId,
        postIds: operation.postIds,
        concretePostId: operation.concretePostId,
        place,
      });
    }

    queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(noteId).slice(0, 2) });

    dispatch(hideModal());
    dispatch(stopOperation());
  };

  const isLoading = isPendingMove || isPendingStick;

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      size="xs"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader
          pb="1"
          px="4"
          textAlign="center"
          fontSize="md"
        >
          Select where you want to {operation.type}
        </ModalHeader>
        {/* <ModalBody px="4" textAlign="center">{description}</ModalBody> */}
        <ModalFooter
          p="0"
          mt="4"
          flexWrap="wrap"
        >
          <Button
            width="50%"
            borderRadius="0"
            variant="outline"
            colorScheme="brand"
            leftIcon={<FaLongArrowAltUp />}
            isLoading={isLoading}
            onClick={handleClick('top')}
          >
            Top
          </Button>
          <Button
            width="50%"
            borderRadius="0"
            variant="outline"
            colorScheme="brand"
            leftIcon={<FaLongArrowAltDown />}
            isLoading={isLoading}
            onClick={handleClick('bottom')}
          >
            Bottom
          </Button>
          <Button
            width="100%"
            borderRadius="0"
            variant="ghost"
            onClick={() => dispatch(hideModal())}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectConcretePlaceModal;