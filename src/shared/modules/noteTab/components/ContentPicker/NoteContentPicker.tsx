import React from 'react';
import { GoFile } from 'react-icons/go';
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
  noteId: number,
  onClick: () => void,
}
const ICON_SIZE = 24;

export const NoteContentPicker = React.memo(({ noteId, onClick }: Props) => {
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
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Dot',
        onClick: () => {
          onClick?.();
          dispatch(showModal({ id: modalIds.createNoteDot }));
        },
      },
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Image',
        onClick: handleNoteAttachmentClick('image'),
      },
      {
        icon: <GoFile size={ICON_SIZE} />,
        title: 'File',
        onClick: handleNoteAttachmentClick('file'),
      },
      {
        icon: <PiFileAudioFill size={ICON_SIZE} />,
        title: 'Audio',
        onClick: handleNoteAttachmentClick('audio'),
      },
      {
        icon: <HiOutlineVideoCamera size={ICON_SIZE} />,
        title: 'Video',
        onClick: handleNoteAttachmentClick('video'),
      },
      {
        icon: <PiFeather size={ICON_SIZE} />,
        title: 'Excalidraw',
        to: '/',
        disabled: true,
      },
      // {
      //   icon: <PiVideo size={ICON_SIZE} />,
      //   title: 'Stream',
      //   to: '/',
      //   disabled: true,
      // },
      // {
      //   icon: <PiMusicNotes size={ICON_SIZE} />,
      //   title: 'Music',
      //   to: '/',
      //   disabled: true,
      // },
      {
        icon: <VscRecord size={ICON_SIZE} />,
        title: 'Record',
        to: '/',
        disabled: true,
      },
    ];
  }, [dispatch, openFilePicker, noteId, onClick, handleNoteAttachmentClick]);

  return (
    <ContentPickerCards items={items} />
  );
});
