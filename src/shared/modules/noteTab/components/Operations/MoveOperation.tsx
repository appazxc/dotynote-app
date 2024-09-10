import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { useMoveNote } from 'shared/api/hooks/useMoveNote';
import { queryClient } from 'shared/api/queryClient';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { MoveOperation as MoveOperationType, stopOperation, toggleConcretePlace } from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = MoveOperationType;

export const MoveOperation = React.memo(({ fromNoteId, postIds, concretePlace }: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();

  const { mutateAsync: move, isPending } = useMoveNote();
  const { mutateAsync: createPostsSettings, isPending: isCreatePostsSettingsPending } = useCreatePostsSettings(note.id);
  
  const handleMove = React.useCallback(async () => {
    if (!note.postsSettings) {
      await createPostsSettings({});
    }

    move({
      postIds,
      parentId: note.id,
    }).then(() => {
      dispatch(stopOperation());
      queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(note.id).slice(0, 2) });

      if (note.id !== fromNoteId) {
        queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(fromNoteId).slice(0, 2) });
      }
    });
  }, [
    dispatch,
    move,
    fromNoteId,
    postIds,
    note.id,
    note.postsSettings,
    createPostsSettings,
  ]);

  const options = note.postsSettings ? [
    {
      label: 'Concrete place',
      onClick: () => dispatch(toggleConcretePlace()),
      selected: concretePlace,
    },
  ] : undefined;

  return (
    <Operation
      title={concretePlace ? 'Move near' : 'Move'}
      description={concretePlace ? 'Click on post and select where you want to move' : undefined}
      options={options}
      isLoading={isPending || isCreatePostsSettingsPending}
      onConfirm={concretePlace ? undefined : handleMove}
    />
  );
});
