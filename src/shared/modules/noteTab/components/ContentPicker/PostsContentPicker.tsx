import React from 'react';
import { GoFile } from 'react-icons/go';
import { IoImageOutline } from 'react-icons/io5';
import { SlNotebook } from 'react-icons/sl';

import { createPost } from 'shared/actions/post/createPost';
import { modalIds } from 'shared/constants/modalIds';
import { useFileUpload } from 'shared/modules/fileUpload';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { turnOnQueryNextPage } from 'shared/util/api/turnOnQueryNextPage';

type Props = {
  note: NoteEntity;
  onClick: () => void;
};

const ICON_SIZE = 24;

export const PostsContentPicker = React.memo((props: Props) => {
  const { note, onClick } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const noteTabId = useNoteTabId(note.id);

  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    if (queryKey) {
      turnOnQueryNextPage(queryKey);
    }
  }, [noteTabId]);

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
        onClick: () => {
          const onFilesAdd = (files: UploadFile[], removeFiles) => {
            dispatch(createPost({
              parentId: note.id,
              files,
              removeFiles,
              onPostCreated: handlePostCreate,
            }));
          };

          openFilePicker({
            type: 'file',
          }, onFilesAdd);

          onClick();
        },
      },
    ];

    return (
      <ContentPickerCards items={items} />
    );
  }, [dispatch, handlePostCreate, openFilePicker, onClick, note.id]);

  return renderedCards;
});
