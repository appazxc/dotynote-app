import React from 'react';
import { GoDot, GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill } from 'react-icons/pi';
import { VscRecord } from 'react-icons/vsc';

import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { modalIds } from 'shared/constants/modalIds';
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
  
  const handleNoteAttachmentClick = React.useCallback((type: UploadFileType) => () => {
    const onFilesAdd = (files, removeFiles) => {
      dispatch(uploadNoteFiles({
        noteId,
        files,
        removeFiles,
      }));
    };

    openFilePicker({ 
      noteId,
      type,
    }, onFilesAdd);
    onClick?.();
  }, [dispatch, noteId, onClick, openFilePicker]);

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
        icon: GoFile,
        title: 'File',
        onClick: handleNoteAttachmentClick('file'),
      },
      {
        icon: PiFileAudioFill,
        title: 'Audio',
        onClick: handleNoteAttachmentClick('audio'),
      },
      {
        icon: HiOutlineVideoCamera,
        title: 'Video',
        onClick: handleNoteAttachmentClick('video'),
      },
      {
        icon: VscRecord,
        title: 'Record',
        to: '/',
        disabled: true,
      },
      {
        icon: PiFeather,
        title: 'Excalidraw',
        to: '/',
        disabled: true,
      },
      // {
      //   icon: PiVideo,
      //   title: 'Stream',
      //   to: '/',
      //   disabled: true,
      // },
      // {
      //   icon: PiMusicNotes,
      //   title: 'Music',
      //   to: '/',
      //   disabled: true,
      // },
    ];
  }, [dispatch, onClick, handleNoteAttachmentClick]);

  return (
    <ContentPickerCards view={isMobile ? 'list' : 'grid'} items={items} />
  );
});
