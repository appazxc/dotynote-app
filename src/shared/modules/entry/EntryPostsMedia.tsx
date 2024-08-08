import React from 'react';

import { Box, Button, Center } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { SlNotebook } from 'react-icons/sl';

import { entityApi } from 'shared/api/entityApi';
import { modalIds } from 'shared/constants/modalIds';
import { EntryMediaCards } from 'shared/modules/entry/EntryMediaCards';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostSettingsEntity } from 'shared/types/entities/PostSettingsEntity';

type Props = {
  note: NoteEntity,
  createPostModalExtraId: string,
  editPostSettingsModalExtraId: string,
  onFinish: () => void,
};

const ICON_SIZE = 24;

export const EntryPostsMedia = React.memo((props: Props) => {
  const { note, createPostModalExtraId, editPostSettingsModalExtraId, onFinish } = props;
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: (postSettings: Partial<PostSettingsEntity>) => {
      return entityApi.note.createRelation(note.id, 'postSettings', postSettings);
    },
    onSuccess() {

    },
  });

  const handleClick = React.useCallback(() => {
    mutate({}, {
      onSuccess: () => {
        onFinish();
        dispatch(showModal({ id: modalIds.editPostSettings, extraId: editPostSettingsModalExtraId }));
      },
    });
  }, [mutate, dispatch, editPostSettingsModalExtraId, onFinish]);

  const renderedCards = React.useMemo(() => {
    const items = [
      {
        title: 'Text',
        icon: <SlNotebook size={ICON_SIZE} />,
        onClick: () => {
          onFinish();
          dispatch(showModal({ id: modalIds.createPost, extraId: createPostModalExtraId }));
        },
      },
    ];

    return (
      <EntryMediaCards items={items} />
    );
  }, [dispatch, createPostModalExtraId, onFinish]);

  return (
    note.postSettingsId 
      ? renderedCards
      : (
        <Center minH="180px">
          <Button
            onClick={handleClick}
            isDisabled={isPending}
          >
            Create posts
          </Button>
        </Center>
      )
  );
});
