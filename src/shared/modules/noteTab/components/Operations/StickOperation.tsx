import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { useStickNote } from 'shared/api/hooks/useStickNote';
import { queryClient } from 'shared/api/queryClient';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { StickOperation as StickOperationType, stopOperation, toggleConcretePlace } from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = StickOperationType;

export const StickOperation = React.memo(({ fromNoteId, noteId, postIds, concretePlace }: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();
  
  const { mutateAsync: createPostsSettings, isPending } = useCreatePostsSettings(note.id);
  const { mutateAsync: stick, isPending: isStickPending } = useStickNote();
  
  const handleStick = React.useCallback(async () => {
    if (!note.postsSettings) {
      await createPostsSettings({});
    }

    stick({
      noteId,
      postIds,
      parentId: note.id,
    }).then(() => {
      dispatch(stopOperation());
      queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(note.id).slice(0, 2) });
    });
  }, [dispatch, stick, createPostsSettings, noteId, postIds, note.id, note.postsSettings]);

  const isSameNote = note.id == fromNoteId;
  
  const options = note.permissions.stickConcreteHere ? [
    {
      label: 'Concrete place',
      onClick: () => dispatch(toggleConcretePlace()),
      selected: concretePlace,
    },
  ] : undefined;

  if (!note.permissions.stickHere) {
    return (
      <Operation
        title="You cannot stick here"
      />
    );
  }

  if (isSameNote) {
    return (
      <Operation
        title="Open note where you want to stick"
      />
    );
  }

  return (
    <Operation
      title={concretePlace ? 'Stick near' : 'Stick'}
      description={concretePlace ? 'Click on post and select where you want to stick' : undefined}
      options={options}
      isLoading={isStickPending || isPending}
      onConfirm={concretePlace ? undefined : handleStick}
    />
  );
});
