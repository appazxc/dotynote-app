import React from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { SlNotebook } from 'react-icons/sl';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { modalIds } from 'shared/constants/modalIds';
import { useFileUpload } from 'shared/modules/fileUpload';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  note: NoteEntity,
  onFinish: () => void,
};

const ICON_SIZE = 24;

export const PostsContent = React.memo((props: Props) => {
  const { note, onFinish } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();

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
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Image',
        onClick: () => {
          const onSuccess = () => {
            dispatch(showModal({ id: modalIds.createPostWithImages }));
          };
          
          openFilePicker({ 
            zoneId: note.id,
            zone: 'post',
            type: 'image',
            uploadImmediately: false,
          }, onSuccess);

          onFinish();
        },
      },
    ];

    return (
      <ContentPickerCards items={items} />
    );
  }, [dispatch, withPostsSettingsCreate, openFilePicker, onFinish, note.id]);

  return renderedCards;
});
