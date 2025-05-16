import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { useStickNotesAndPosts } from 'shared/api/hooks/useStickNotesAndPosts';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { 
  StickOperation as StickOperationType, 
  stopOperation, 
  updateConcreteParentId, 
  clearConcreteParentId,  
} from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = StickOperationType;

export const StickOperation = React.memo(({ fromNoteId, noteIds, postIds, concreteParentId }: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();
  
  const { mutateAsync: createPostsSettings, isPending } = useCreatePostsSettings(note.id);
  const { mutateAsync: stick, isPending: isStickPending } = useStickNotesAndPosts(note.id);
  
  const handleStick = React.useCallback(async () => {
    if (!note.postsSettings) {
      await createPostsSettings({});
    }

    await stick({
      noteIds,
      postIds,
    });
    dispatch(stopOperation());
  }, [dispatch, stick, createPostsSettings, noteIds, postIds, note.postsSettings]);

  const isSameNote = note.id == fromNoteId;
  
  const options = note.postsPermissions?.stickConcreteHere ? [
    {
      label: 'Concrete place',
      onClick: () => dispatch(concreteParentId ? clearConcreteParentId() : updateConcreteParentId(note.id)),
      selected: !!concreteParentId,
    },
  ] : undefined;

  if (!note.postsPermissions?.stickHere) {
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
      title={concreteParentId ? 'Stick near' : 'Stick'}
      description={concreteParentId ? 'Click on post and select where you want to stick' : undefined}
      options={options}
      isLoading={isStickPending || isPending}
      onConfirm={concreteParentId ? undefined : handleStick}
    />
  );
});
