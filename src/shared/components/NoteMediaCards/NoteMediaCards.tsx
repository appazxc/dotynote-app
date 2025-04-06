import { Card, Center, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';
import { VscRecord } from 'react-icons/vsc';

import { createNote } from 'shared/actions/note/createNote';
import { modalIds } from 'shared/constants/modalIds';
import { useFileUpload } from 'shared/modules/fileUpload';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  isMobile?: boolean;
  loaderHeight?: string;
  onCreate: (noteId: number) => void;
  onTextClick?: () => void;
};

export const NoteMediaCards = React.memo((props: Props) => {
  const { isMobile, onCreate, onTextClick, loaderHeight = '300px' } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const [isLoading, setIsLoading] = React.useState(false);

  const cards = React.useMemo(() => [
    {
      icon: <SlNotebook size="22" />,
      title: 'Text',
      onClick: () => {
        onTextClick?.();
        dispatch(showModal({ id: modalIds.createNote }));
      },
    },
    {
      icon: <GoFile size="22" />,
      title: 'File',
      onClick: () => {
        const onFilesAdd = (files, removeFiles) => {
          setIsLoading(true);

          dispatch(createNote({
            files,
            onCreate,
            removeFiles,
          }));
        };

        openFilePicker({
          type: 'file',
        }, onFilesAdd);
      },
    },
    {
      icon: <IoImageOutline size="22" />,
      title: 'Image',
      onClick: () => {
        const onFilesAdd = (files, removeFiles) => {
          setIsLoading(true);

          dispatch(createNote({
            files,
            onCreate,
            removeFiles,
          }));
        };

        openFilePicker({
          type: 'image',
        }, onFilesAdd);
      },
    },
    {
      icon: <PiFileAudioFill size="22" />,
      title: 'Audio',
      onClick: () => {
        const onFilesAdd = (files, removeFiles) => {
          setIsLoading(true);

          dispatch(createNote({
            files,
            onCreate,
            removeFiles,
          }));
        };

        openFilePicker({
          type: 'audio',
        }, onFilesAdd);
      },
    },
    {
      icon: <PiFeather size="22" />,
      title: 'Excalidraw',
      to: '/',
      isDisabled: true,
    },
    {
      icon: <HiOutlineVideoCamera size="22" />,
      title: 'Video',
      to: '/',
      isDisabled: true,
    },
    // {
    //   icon: <PiVideo size="22" />,
    //   title: 'Stream',
    //   to: '/',
    //   description: constructionText,
    //   isDisabled: true,
    // },
    // {
    //   icon: <PiMusicNotes size="22" />,
    //   title: 'Music',
    //   to: '/',
    //   description: constructionText,
    //   isDisabled: true,
    // },
    {
      icon: <VscRecord size="22" />,
      title: 'Record',
      to: '/',
      isDisabled: true,
    },
  ], [dispatch, openFilePicker, onCreate, onTextClick]);

  if (isLoading) {
    return <Center h={loaderHeight}><Spinner /></Center>;
  }
  
  return (
    <SimpleGrid
      gap={4}
      templateColumns={isMobile ? 'repeat(auto-fill, minmax(90px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))'}
    >
      {cards.map(({ title, icon, isDisabled, ...restProps }) => {
        return (
          <Card.Root
            key={title}
            {...restProps}
            cursor={isDisabled ? 'default' : 'pointer'}
            opacity={isDisabled ? '0.6' : '1'}
            flexDirection="row"
            alignItems="center"
          >
            <Card.Header p="2">
              {icon}
            </Card.Header>
            <Card.Body
              display="flex"
              p="2"
            >
              <Text fontSize={isMobile ? 'sm' : 'md'}>{title}</Text>
            </Card.Body>
          </Card.Root>
        );
      })}
    </SimpleGrid>
  );
});
