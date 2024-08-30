import React from 'react';

import { Button, Center } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { SlNotebook } from 'react-icons/sl';

import { entityApi } from 'shared/api/entityApi';
import { modalIds } from 'shared/constants/modalIds';
import { EntryMediaCards } from 'shared/modules/entry/EntryMediaCards';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

type Props = {
  note: NoteEntity,
  createPostModalExtraId: string,
  editPostsSettingsModalExtraId: string,
  onFinish: () => void,
};

const ICON_SIZE = 24;

export const EntryPostsMedia = React.memo((props: Props) => {
  const { note, createPostModalExtraId, editPostsSettingsModalExtraId, onFinish } = props;
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: (postsSettings: Partial<PostsSettingsEntity>) => {
      return entityApi.note.createRelation(note.id, 'postsSettings', postsSettings);
    },
    onSuccess() {

    },
  });

  const handleClick = React.useCallback(() => {
    mutate({}, {
      onSuccess: () => {
        onFinish();
        dispatch(showModal({ id: modalIds.editPostsSettings, extraId: editPostsSettingsModalExtraId }));
      },
    });
  }, [mutate, dispatch, editPostsSettingsModalExtraId, onFinish]);

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
    note.postsSettingsId 
      ? renderedCards
      : (
        <Center minH="180px">
          <Button
            isDisabled={isPending}
            onClick={handleClick}
          >
            Create posts
          </Button>
        </Center>
      )
  );
});
