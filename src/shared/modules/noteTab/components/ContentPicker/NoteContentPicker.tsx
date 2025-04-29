import React from 'react';
import { GoDot, GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFileAudioFill } from 'react-icons/pi';

import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { modalIds } from 'shared/constants/modalIds';
import { useCreditsCheck } from 'shared/hooks/useCreditsCheck';
import { useFileUpload } from 'shared/modules/fileUpload';
import { UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  noteId: number;
  onClick: () => void;
  isMobile?: boolean;
}

export const NoteContentPicker = React.memo(({ noteId, onClick, isMobile = false }: Props) => {
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const checkCredits = useCreditsCheck();
  
  const handleNoteAttachmentClick = React.useCallback((type: UploadFileType) => () => {
    const onFilesAdd = (files, removeFiles) => {
      checkCredits(
        { files },
        () => dispatch(uploadNoteFiles({
          noteId,
          files,
          removeFiles,
        }))
      );
    };

    openFilePicker({ 
      noteId,
      type,
    }, onFilesAdd);
    onClick?.();
  }, [dispatch, checkCredits, noteId, onClick, openFilePicker]);

  const items = React.useMemo(() => {
    return [
      {
        icon: GoDot,
        title: 'Dot',
        onClick: () => {
          onClick?.();

          // looks like there some problems with popover + modal focus events. modal close instantly after open
          // if not wait a bit
          // src/desktop/modules/noteTab/NoteSidebar/SidebarPlusMenu.tsx
          // TODO find a solution
          setTimeout(() => {
            dispatch(showModal({ id: modalIds.createNoteDot }));
          });
        },
      },
      {
        icon: IoImageOutline,
        title: 'Image',
        onClick: handleNoteAttachmentClick('image'),
      },
      {
        icon: HiOutlineVideoCamera,
        title: 'Video',
        onClick: handleNoteAttachmentClick('video'),
      },
      {
        icon: PiFileAudioFill,
        title: 'Audio',
        onClick: handleNoteAttachmentClick('audio'),
      },
      {
        icon: GoFile,
        title: 'File',
        onClick: handleNoteAttachmentClick('file'),
      },
      // {
      //   icon: VscRecord,
      //   title: 'Record',
      //   to: '/',
      //   isDisabled: true,
      // },
      // {
      //   icon: PiFeather,
      //   title: 'Excalidraw',
      //   to: '/',
      //   isDisabled: true,
      // },
      // {
      //   icon: PiVideo,
      //   title: 'Stream',
      //   to: '/',
      //   isDisabled: true,
      // },
      // {
      //   icon: PiMusicNotes,
      //   title: 'Music',
      //   to: '/',
      //   isDisabled: true,
      // },
    ];
  }, [dispatch, onClick, handleNoteAttachmentClick]);

  return (
    <ContentPickerCards view={isMobile ? 'list' : 'grid'} items={items} />
  );
});
