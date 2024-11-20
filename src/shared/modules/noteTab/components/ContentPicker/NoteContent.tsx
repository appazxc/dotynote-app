import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill, PiMusicNotes, PiVideo } from 'react-icons/pi';
import { VscRecord } from 'react-icons/vsc';

import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';

const ICON_SIZE = 24;

export const NoteContent = React.memo(() => {
  const items = React.useMemo(() => {
    return [
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Image',
        isDisabled: true,
      },
      {
        icon: <GoFile size={ICON_SIZE} />,
        title: 'File',
        to: '/',
        isDisabled: true,
      },
      {
        icon: <PiFeather size={ICON_SIZE} />,
        title: 'Excalidraw',
        to: '/',
        isDisabled: true,
      },
      {
        icon: <HiOutlineVideoCamera size={ICON_SIZE} />,
        title: 'Video',
        to: '/',
        isDisabled: true,
      },
      {
        icon: <PiVideo size={ICON_SIZE} />,
        title: 'Stream',
        to: '/',
        isDisabled: true,
      },
      {
        icon: <PiMusicNotes size={ICON_SIZE} />,
        title: 'Music',
        to: '/',
        isDisabled: true,
      },
      {
        icon: <PiFileAudioFill size={ICON_SIZE} />,
        title: 'Audio',
        to: '/',
        isDisabled: true,
      },
      {
        icon: <VscRecord size={ICON_SIZE} />,
        title: 'Record',
        to: '/',
        isDisabled: true,
      },
    ];
  }, []);

  return (
    <ContentPickerCards items={items} />
  );
});
