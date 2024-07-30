import React from 'react';

import { Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { entityApi } from 'shared/api/entityApi';
import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { useStickNote } from 'shared/api/hooks/useStickNote';
import { queryClient } from 'shared/api/queryClient';
import { modalIds } from 'shared/constants/modalIds';
import { EditPostSettingsModal } from 'shared/containers/modals/EditPostSettingsModal';
import { useTabNote } from 'shared/hooks/useTabNote';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { StickOperation as StickOperationType, toggleConcretePlace } from 'shared/store/slices/appSlice';
import { PostSettingsEntity } from 'shared/types/entities/PostSettingsEntity';

import { Operation } from './Operation';

type Props = StickOperationType;

const extraId = 'stickOperation';

export const StickOperation = React.memo(({ fromNoteId, noteIds, concretePlace }: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();

  const { mutate, isPending } = useMutation({
    mutationFn: (postSettings: Partial<PostSettingsEntity>) => {
      return entityApi.note.createRelation(note.id, 'postSettings', postSettings);
    },
    onSuccess() {},
  });

  const { mutateAsync: stick } = useStickNote();
  
  const handleCreatePostSettings = React.useCallback(() => {
    mutate({}, {
      onSuccess: () => {
        dispatch(showModal({ id: modalIds.editPostSettings, extraId }));
      },
    });
  }, [mutate, dispatch]);

  const handleStick = React.useCallback(() => {
    stick({
      fromNoteId,
      noteIds,
      parentId: note.id,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(note.id).slice(0, 2) });
      },
    });
  }, [stick, fromNoteId, noteIds, note.id]);

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
            To <Text fontWeight="bold" as="span">stick</Text> here you need create posts first
          </Text>
        )}
        confirmText="Create"
        onConfirm={handleCreatePostSettings}
        isLoading={isPending}
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
    <>
      <Operation
        title={concretePlace ? 'Stick near': 'Stick'}
        description={concretePlace ? 'Click on post and select where you want to stick': undefined}
        options={options}
        onConfirm={handleStick}
      />

      <EditPostSettingsModal noteId={note.id} extraId={extraId} />
    </>
  );
});
