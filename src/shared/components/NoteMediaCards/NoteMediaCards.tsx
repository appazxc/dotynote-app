import { Text, Card, SimpleGrid, Center, Spinner } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiVideo, PiMusicNotes, PiFileAudioFill } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';
import { VscRecord } from 'react-icons/vsc';

import { createNote } from 'shared/actions/note/createNote';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { useFileUpload } from 'shared/modules/fileUpload';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  isMobile?: boolean,
};

export const NoteMediaCards = React.memo(({ isMobile }: Props) => {
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const constructionText = isMobile ? 'Constructing' : 'Under construction';

  const cards = React.useMemo(() => [
    {
      icon: <SlNotebook size="35" />,
      title: 'Text',
      onClick: () => {
        dispatch(showModal({ id: modalIds.createNote }));
      },
    },
    {
      icon: <IoImageOutline size="35" />,
      title: 'Image',
      to: '/',
      description: constructionText,
      onClick: () => {
        const onFilesAdd = (files, removeFiles) => {
          setIsLoading(true);

          dispatch(createNote({
            files,
            onNoteCreated: (noteId: number) => {
              navigate({ to: noteRoutePath, params: { noteId } });
            },
            removeFiles,
          }));
        };

        openFilePicker({
          type: 'image',
        }, onFilesAdd);
      },
    },
    {
      icon: <GoFile size="35" />,
      title: 'File',
      to: '/',
      description: constructionText,
      onClick: () => {
        const onFilesAdd = (files, removeFiles) => {
          setIsLoading(true);

          dispatch(createNote({
            files,
            onNoteCreated: (noteId: number) => {
              navigate({ to: noteRoutePath, params: { noteId } });
            },
            removeFiles,
          }));
        };

        openFilePicker({
          type: 'file',
        }, onFilesAdd);
      },
    },
    {
      icon: <PiFeather size="35" />,
      title: 'Excalidraw',
      to: '/',
      description: constructionText,
      isDisabled: true,
    },
    {
      icon: <HiOutlineVideoCamera size="35" />,
      title: 'Video',
      to: '/',
      description: constructionText,
      isDisabled: true,
    },
    // {
    //   icon: <PiVideo size="35" />,
    //   title: 'Stream',
    //   to: '/',
    //   description: constructionText,
    //   isDisabled: true,
    // },
    // {
    //   icon: <PiMusicNotes size="35" />,
    //   title: 'Music',
    //   to: '/',
    //   description: constructionText,
    //   isDisabled: true,
    // },
    {
      icon: <PiFileAudioFill size="35" />,
      title: 'Audio',
      to: '/',
      description: constructionText,
      isDisabled: true,
    },
    {
      icon: <VscRecord size="35" />,
      title: 'Record',
      to: '/',
      description: constructionText,
      isDisabled: true,
    },
  ], [dispatch, constructionText, navigate, openFilePicker]);

  if (isLoading) {
    return <Center h="300px"><Spinner /></Center>;
  }
  
  return (
    <SimpleGrid
      gap={4}
      templateColumns={isMobile ? 'repeat(auto-fill, minmax(90px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))'}
    >
      {cards.map(({ title, icon, description, isDisabled, ...restProps }) => {
        return (
          <Card.Root
            key={title}
            {...restProps}
            cursor={isDisabled ? 'default' : 'pointer'}
            opacity={isDisabled ? '0.6' : '1'}
          >
            <Card.Header p="2">
              {icon}
            </Card.Header>
            <Card.Body
              pt="2"
              pb="1"
              px="2"
              display="flex"
              alignItems="flex-end"
            >
              <Text fontWeight="500" fontSize={isMobile ? 'sm' : 'lg'}>{title}</Text>
            </Card.Body>
          </Card.Root>
        );
      })}
    </SimpleGrid>
  );
});
