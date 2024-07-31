import React from 'react';

import { Text } from '@chakra-ui/react';

import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { useMoveNote } from 'shared/api/hooks/useMoveNote';
import { queryClient } from 'shared/api/queryClient';
import { EditPostSettingsModal } from 'shared/containers/modals/EditPostSettingsModal';
import { useTabNote } from 'shared/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { MoveOperation as MoveOperationType, stopOperation, toggleConcretePlace } from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = MoveOperationType;

const extraId = 'moveOperation';

export const MoveOperation = React.memo(({ fromNoteId, postIds, concretePlace }: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();

  const { mutateAsync: move, isPending: isStickPending } = useMoveNote();
  
  const handleMove = React.useCallback(() => {
    move({
      postIds,
      parentId: note.id,
    }, {
      onSuccess: () => {
        dispatch(stopOperation());
        queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(note.id).slice(0, 2) });
        queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(fromNoteId).slice(0, 2) });
      },
    });
  }, [dispatch, move, fromNoteId, postIds, note.id]);

  const isSameNote = note.id == fromNoteId;
  
  const options = [
    {
      label: 'Concrete place',
      onClick: () => dispatch(toggleConcretePlace()),
      selected: concretePlace,
    },
  ];

  if (!note.postSettingsId) {
    return (
      <Operation
        title={(
          <Text fontWeight="medium" fontSize="sm">
            To <Text fontWeight="bold" as="span">move</Text> here you need create posts first
          </Text>
        )}
      />
    );
  }

  if (isSameNote) {
    return (
      <Operation
        title="Open note where you want to move"
      />
    );
  }

  return (
    <>
      <Operation
        title={concretePlace ? 'Move near': 'Move'}
        description={concretePlace ? 'Click on post and select where you want to move': undefined}
        options={options}
        isLoading={isStickPending}
        onConfirm={handleMove}
      />

      <EditPostSettingsModal noteId={note.id} extraId={extraId} />
    </>
  );
});
