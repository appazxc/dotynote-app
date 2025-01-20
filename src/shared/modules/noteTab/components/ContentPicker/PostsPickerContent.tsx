import React from 'react';
import { GoFile } from 'react-icons/go';
import { IoImageOutline } from 'react-icons/io5';
import { SlNotebook } from 'react-icons/sl';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { modalIds } from 'shared/constants/modalIds';
import { useFileUpload } from 'shared/modules/fileUpload';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  note: NoteEntity,
  onClose: () => void,
};

const ICON_SIZE = 24;

export const PostsPickerContent = React.memo((props: Props) => {
  const { note, onClose } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();

  const { mutateAsync } = useCreatePostsSettings(note.id);

  const withPostsSettingsCreate = React.useCallback((cb) => async () => {
    onClose();

    if (!note.postsSettings) {
      await mutateAsync({});
    }
    await cb();
  }, [mutateAsync, onClose, note.postsSettings]);

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
          const onFilesAdd = () => {
            dispatch(showModal({ id: modalIds.createPostWithImages }));
          };
          
          openFilePicker({ 
            zoneId: note.id,
            zone: 'post',
            type: 'image',
            uploadImmediately: false,
          }, onFilesAdd);

          onClose();
        },
      },
      {
        icon: <GoFile size={ICON_SIZE} />,
        title: 'File',
        onClick: () => {
          const onFilesAdd = (files: UploadFile[]) => {
            console.log('files', files);
          };

          openFilePicker({ 
            zoneId: note.id,
            zone: 'post',
            type: 'file',
            uploadImmediately: false,
          }, onFilesAdd);

          onClose();
        },
      },
    ];

    return (
      <ContentPickerCards items={items} />
    );
  }, [dispatch, withPostsSettingsCreate, openFilePicker, onClose, note.id]);

  return renderedCards;
});
