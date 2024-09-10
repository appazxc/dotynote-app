import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { SlNotebook } from 'react-icons/sl';

import { entityApi } from 'shared/api/entityApi';
import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
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
  const { note, createPostModalExtraId, onFinish } = props;
  const dispatch = useAppDispatch();

  const { mutateAsync } = useCreatePostsSettings(note.id);

  const withPostsSettingsCreate = React.useCallback((cb) => async () => {
    onFinish();

    if (!note.postsSettings) {
      await mutateAsync({});
    }
    await cb();
  }, [mutateAsync, onFinish, note.postsSettings]);

  const renderedCards = React.useMemo(() => {
    const items = [
      {
        title: 'Text',
        icon: <SlNotebook size={ICON_SIZE} />,
        onClick: withPostsSettingsCreate(async () => {
          dispatch(showModal({ id: modalIds.createPost, extraId: createPostModalExtraId }));
        }),
      },
    ];

    return (
      <EntryMediaCards items={items} />
    );
  }, [dispatch, createPostModalExtraId, withPostsSettingsCreate]);

  return renderedCards;
});
