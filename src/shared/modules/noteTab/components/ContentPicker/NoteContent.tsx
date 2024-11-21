import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill, PiMusicNotes, PiVideo } from 'react-icons/pi';
import { VscRecord } from 'react-icons/vsc';

import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  onFinish?: () => void,
}
const ICON_SIZE = 24;

export const NoteContent = React.memo(({ onFinish }: Props) => {
  const dispatch = useAppDispatch();
  
  const items = React.useMemo(() => {
    return [
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Dot',
        onClick: () => {
          onFinish?.();
          dispatch(showModal({ id: modalIds.createNoteDot }));
        },
      },
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Image',
        disabled: true,
      },
      {
        icon: <GoFile size={ICON_SIZE} />,
        title: 'File',
        to: '/',
        disabled: true,
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
      {
        icon: <PiVideo size={ICON_SIZE} />,
        title: 'Stream',
        to: '/',
        disabled: true,
      },
      {
        icon: <PiMusicNotes size={ICON_SIZE} />,
        title: 'Music',
        to: '/',
        disabled: true,
      },
      {
        icon: <PiFileAudioFill size={ICON_SIZE} />,
        title: 'Audio',
        to: '/',
        disabled: true,
      },
      {
        icon: <VscRecord size={ICON_SIZE} />,
        title: 'Record',
        to: '/',
        disabled: true,
      },
    ];
  }, [dispatch, onFinish]);

  return (
    <ContentPickerCards items={items} />
  );
});
