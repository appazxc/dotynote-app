import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { useMovePosts } from 'shared/api/hooks/useMovePosts';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { MoveOperation as MoveOperationType, stopOperation, toggleConcretePlace } from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = MoveOperationType;

export const MoveOperation = React.memo(({ fromNoteId, postIds, concretePlace }: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();

  const { mutateAsync: move, isPending } = useMovePosts(note.id);
  const { mutateAsync: createPostsSettings, isPending: isCreatePostsSettingsPending } = useCreatePostsSettings(note.id);
  
  const handleMove = React.useCallback(async () => {
    if (!note.postsSettings) {
      await createPostsSettings({});
    }

    await move({
      postIds,
      fromNoteId,
    });

    dispatch(stopOperation());
  }, [
    dispatch,
    move,
    fromNoteId,
    postIds,
    note.postsSettings,
    createPostsSettings,
  ]);

  const options = note.permissions.moveConcreteHere ? [
    {
      label: 'Concrete place',
      onClick: () => dispatch(toggleConcretePlace()),
      selected: concretePlace,
    },
  ] : undefined;

  if (!note.permissions.moveHere) {
    return (
      <Operation
        title="You cannot move here"
      />
    );
  }
  
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
