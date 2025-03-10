import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoImageOutline } from 'react-icons/io5';
import { PiFileAudioFill } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';

import { createPost } from 'shared/actions/post/createPost';
import { modalIds } from 'shared/constants/modalIds';
import { useFileUpload } from 'shared/modules/fileUpload';
import { UploadFile, UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useGetNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useGetNoteTabQueryKey';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { activateInfinityQueryNextPage } from 'shared/util/api/activateInfinityQueryNextPage';

type Props = {
  note: NoteEntity;
  onClick: () => void;
};

const ICON_SIZE = 24;

export const PostsContentPicker = React.memo((props: Props) => {
  const { note, onClick } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const getQueryKey = useGetNoteTabQueryKey(note.id);

  const handlePostCreate = React.useCallback(() => {
    activateInfinityQueryNextPage(getQueryKey());
  }, [getQueryKey]);

  const handlePostAttachmentClick = React.useCallback((type: UploadFileType) => () => {
    const onFilesAdd = (files: UploadFile[], removeFiles) => {
      dispatch(createPost({
        parentId: note.id,
        files,
        removeFiles,
        onPostCreated: handlePostCreate,
      }));
    };

    openFilePicker({
      type,
    }, onFilesAdd);

    onClick();
  }, [dispatch, onClick, handlePostCreate, openFilePicker, note.id]);

  const renderedCards = React.useMemo(() => {
    const items = [
      {
        title: 'Text',
        icon: <SlNotebook size={ICON_SIZE} />,
        onClick: () => {
          onClick();

          // looks like there some problems with popover + modal focus events. modal close instantly after open
          // if not wait a bit
          // src/desktop/modules/noteTab/NoteSidebar/SidebarPlusMenu.tsx
          // TODO find a solution
          setTimeout(() => {
            dispatch(showModal({ id: modalIds.createPost }));
          });
        },
      },
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Image',
        onClick: () => {
          const onFilesAdd = () => {
            dispatch(showModal({ id: modalIds.createPostWithImages }));
          };
          
          openFilePicker({ 
            type: 'image',
          }, onFilesAdd);

          onClick();
        },
      },
      {
        icon: <GoFile size={ICON_SIZE} />,
        title: 'File',
        onClick: handlePostAttachmentClick('file'),
      },
      {
        icon: <PiFileAudioFill size={ICON_SIZE} />,
        title: 'Audio',
        onClick: handlePostAttachmentClick('audio'),
      },
      {
        icon: <HiOutlineVideoCamera size={ICON_SIZE} />,
        title: 'Video',
        onClick: handlePostAttachmentClick('video'),
      },
    ];

    return (
      <ContentPickerCards items={items} />
    );
  }, [dispatch, handlePostAttachmentClick, openFilePicker, onClick]);

  return renderedCards;
});
