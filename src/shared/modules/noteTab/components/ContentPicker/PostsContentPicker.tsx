import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoImageOutline } from 'react-icons/io5';
import { PiFileAudioFill } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';

import { createPost } from 'shared/actions/post/createPost';
import { modalIds } from 'shared/constants/modalIds';
import { useCreditsCheck } from 'shared/hooks/useCreditsCheck';
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
  isMobile?: boolean;
};

export const PostsContentPicker = React.memo((props: Props) => {
  const { note, onClick, isMobile = false } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const getQueryKey = useGetNoteTabQueryKey(note.id);
  const checkCredits = useCreditsCheck();
  const handlePostCreate = React.useCallback(() => {
    activateInfinityQueryNextPage(getQueryKey());
  }, [getQueryKey]);

  const handlePostAttachmentClick = React.useCallback((type: UploadFileType) => async () => {
    const onFilesAdd = async (files: UploadFile[], removeFiles) => {
      checkCredits(
        {
          files,
          resources: { post: 1 },
        },
        () => dispatch(createPost({
          parentId: note.id,
          files,
          removeFiles,
          onPostCreated: handlePostCreate,
        }))
      );
    };
    
    openFilePicker({
      type,
    }, onFilesAdd);

    onClick();
  }, [dispatch, checkCredits, onClick, handlePostCreate, openFilePicker, note.id]);

  const items = React.useMemo(() => {
    return [
      {
        title: 'Text',
        icon: SlNotebook,
        onClick: async () => {
          onClick();

          await checkCredits(
            { resources: { post: 1 } },
            () => {
              // looks like there some problems with popover + modal focus events. modal close instantly after open
              // if not wait a bit
              // src/desktop/modules/noteTab/NoteSidebar/SidebarPlusMenu.tsx
              // TODO find a solution
              setTimeout(() => {
                dispatch(showModal({ id: modalIds.createPost }));
              });
            }
          );
        },
      },
      {
        icon: IoImageOutline,
        title: 'Image',
        onClick: async () => {
          const onFilesAdd = async (files: UploadFile[], removeFiles) => {
            checkCredits(
              {
                files,
                resources: { post: 1 },
              },
              () => {
                if (files.length === 1) {
                  dispatch(createPost({
                    parentId: note.id,
                    files,
                    removeFiles,
                    onPostCreated: handlePostCreate,
                  }));
                } else {
                  dispatch(showModal({ id: modalIds.createPostWithImages }));
                }
              }
            );
          };
          
          openFilePicker({ 
            type: 'image',
          }, onFilesAdd);

          onClick();
        },
      },
      {
        icon: GoFile,
        title: 'File',
        onClick: handlePostAttachmentClick('file'),
      },
      {
        icon: PiFileAudioFill,
        title: 'Audio',
        onClick: handlePostAttachmentClick('audio'),
      },
      {
        icon: HiOutlineVideoCamera,
        title: 'Video',
        onClick: handlePostAttachmentClick('video'),
      },
    ];
  }, [dispatch, note.id, checkCredits, handlePostAttachmentClick, handlePostCreate, openFilePicker, onClick]);
  
  return <ContentPickerCards view={isMobile ? 'list' : 'grid'} items={items} />;
});
