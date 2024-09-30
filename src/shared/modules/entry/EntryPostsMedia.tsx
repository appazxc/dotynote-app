import React from 'react';

import { SlNotebook } from 'react-icons/sl';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { modalIds } from 'shared/constants/modalIds';
import { EntryMediaCards } from 'shared/modules/entry/EntryMediaCards';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  note: NoteEntity,
  onFinish: () => void,
};

const ICON_SIZE = 24;

export const EntryPostsMedia = React.memo((props: Props) => {
  const { note, onFinish } = props;
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
          dispatch(showModal({ id: modalIds.createPost }));
        }),
      },
    ];

    return (
      <EntryMediaCards items={items} />
    );
  }, [dispatch, withPostsSettingsCreate]);

  return renderedCards;
});
