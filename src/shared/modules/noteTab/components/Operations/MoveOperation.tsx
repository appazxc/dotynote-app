import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { useMovePosts } from 'shared/api/hooks/useMovePosts';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { 
  MoveOperation as MoveOperationType, 
  stopOperation, 
  updateConcreteParentId, 
  clearConcreteParentId,  
} from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = MoveOperationType;

export const MoveOperation = React.memo(({ fromNoteId, postIds, concreteParentId }: Props) => {
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

  const options = note.postsPermissions?.moveConcreteHere ? [
    {
      label: 'Concrete place',
      onClick: () => dispatch(concreteParentId ? clearConcreteParentId() : updateConcreteParentId(note.id)),
      selected: !!concreteParentId,
    },
  ] : undefined;

  if (!note.postsPermissions?.moveHere) {
    return (
      <Operation
        title="You cannot move here"
      />
    );
  }
  
  return (
    <Operation
      title={concreteParentId ? 'Move near' : 'Move'}
      description={concreteParentId ? 'Click on post and select where you want to move' : undefined}
      options={options}
      isLoading={isPending || isCreatePostsSettingsPending}
      onConfirm={concreteParentId ? undefined : handleMove}
    />
  );
});
