import { Center, DialogBody, Spinner, Stack, Text } from '@chakra-ui/react';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

import { useMovePosts } from 'shared/api/hooks/useMovePosts';
import { useStickNotesAndPosts } from 'shared/api/hooks/useStickNotesAndPosts';
import { Button } from 'shared/components/ui/button';
import {
  DialogBackdrop,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { stopOperation } from 'shared/store/slices/appSlice';
import { ModalBase } from 'shared/types/modal';
import { invariant } from 'shared/util/invariant';

export type Props = ModalBase<{
  noteId: number;
}>

const SelectConcretePlaceModal = (props: Props) => {
  const { noteId, isOpen = true } = props;
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);
  const { mutateAsync: move, isPending: isPendingMove } = useMovePosts(noteId);
  const { mutateAsync: stick, isPending: isPendingStick } = useStickNotesAndPosts(noteId);

  invariant(operation.type, 'Operation type is empty in SelectConcretePlaceModal');

  const handleClick = (place: 'top' | 'bottom') => async () => {
    if (operation.type === 'move' && operation.concretePostId) {
      await move({
        fromNoteId: operation.fromNoteId,
        postIds: operation.postIds,
        concretePostId: operation.concretePostId,
        place,
      });
    }

    if (operation.type === 'stick') {
      await stick({
        noteIds: operation.noteIds,
        postIds: operation.postIds,
        concretePostId: operation.concretePostId,
        place,
      });
    }

    dispatch(hideModal());
    dispatch(stopOperation());
  };

  const isLoading = isPendingMove || isPendingStick;

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      size="xs"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent overflow="hidden">
        {!isLoading && (
          <DialogHeader
            pb="1"
            px="4"
            textAlign="center"
            fontSize="md"
          >
            <DialogTitle>Select where you want to {operation.type}</DialogTitle>
          </DialogHeader>
        )}
        {isLoading && (
          <DialogBody p="0">
            <Center h="160px">
              <Stack gap="2" direction="row">
                <Spinner /><Text fontSize="md">Loading</Text>
              </Stack>
            </Center>
          </DialogBody>
        )}
        {!isLoading && (
          <DialogFooter
            p="0"
            mt="4"
            flexWrap="wrap"
            justifyContent="center"
          >
            <Button
              width="50%"
              variant="subtle"
              borderRadius="md"
              loading={isLoading}
              onClick={handleClick('top')}
            >
              <FaLongArrowAltUp /> Top
            </Button>
            <Button
              width="50%"
              variant="subtle"
              borderRadius="md"
              loading={isLoading}
              onClick={handleClick('bottom')}
            >
              <FaLongArrowAltDown /> Bottom
            </Button>
            <Button
              width="100%"
              borderRadius="0"
              variant="ghost"
              onClick={() => dispatch(hideModal())}
            >
            Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

export default SelectConcretePlaceModal;