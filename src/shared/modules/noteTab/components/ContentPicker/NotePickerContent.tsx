import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill, PiMusicNotes, PiVideo } from 'react-icons/pi';
import { VscRecord } from 'react-icons/vsc';

import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { modalIds } from 'shared/constants/modalIds';
import { useFileUpload } from 'shared/modules/fileUpload';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  noteId: number,
  onClick: () => void,
}
const ICON_SIZE = 24;

export const NotePickerContent = React.memo(({ noteId, onClick }: Props) => {
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();

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
        onClick: () => {
          const onFilesAdd = (files, removeFiles) => {
            dispatch(uploadNoteFiles({
              noteId,
              files,
              removeFiles,
            }));
          };

          openFilePicker({ 
            noteId,
            type: 'image',
          }, onFilesAdd);
          onClick?.();
        },
      },
      {
        icon: <GoFile size={ICON_SIZE} />,
        title: 'File',
        onClick: () => {
          const onFilesAdd = (files, removeFiles) => {
            dispatch(uploadNoteFiles({
              noteId,
              files,
              removeFiles,
            }));
          };

          openFilePicker({ 
            noteId,
            type: 'file',
          }, onFilesAdd);

          onClick?.();
        },
      },
      {
        icon: <PiFileAudioFill size={ICON_SIZE} />,
        title: 'Audio',
        to: '/',
        onClick: () => {
          const onFilesAdd = (files, removeFiles) => {
            dispatch(uploadNoteFiles({
              noteId,
              files,
              removeFiles,
            }));
          };

          openFilePicker({ 
            noteId,
            type: 'audio',
          }, onFilesAdd);

          onClick?.();
        },
      },
      {
        icon: <PiFeather size={ICON_SIZE} />,
        title: 'Excalidraw',
        to: '/',
        disabled: true,
      },
      {
        icon: <HiOutlineVideoCamera size={ICON_SIZE} />,
        title: 'Video',
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
  }, [dispatch, openFilePicker, noteId, onClick]);

  return (
    <ContentPickerCards items={items} />
  );
});
