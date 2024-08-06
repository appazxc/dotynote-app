import React from 'react';

import { Text, Card, CardBody, CardHeader, SimpleGrid } from '@chakra-ui/react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiVideo, PiMusicNotes, PiFileAudioFill } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';
import { VscRecord } from 'react-icons/vsc';

import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  isMobile?: boolean,
};

export const NoteContentCards = React.memo(({ isMobile }: Props) => {
  const dispatch = useAppDispatch();

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
      isDisabled: true,
    },
    {
      icon: <GoFile size="35" />,
      title: 'File',
      to: '/',
      description: constructionText,
      isDisabled: true,
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
    {
      icon: <PiVideo size="35" />,
      title: 'Stream',
      to: '/',
      description: constructionText,
      isDisabled: true,
    },
    {
      icon: <PiMusicNotes size="35" />,
      title: 'Music',
      to: '/',
      description: constructionText,
      isDisabled: true,
    },
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
  ], [dispatch, constructionText]);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns={isMobile ? 'repeat(auto-fill, minmax(90px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))'}
    >
      {cards.map(({ title, icon, description, isDisabled, ...restProps }) => {
        return (
          <Card
            key={title}
            {...restProps}
            cursor={isDisabled ? 'default' : 'pointer'}
            opacity={isDisabled ? '0.6' : '1'}
          >
            <CardHeader p="2">
              {icon}
            </CardHeader>
            <CardBody
              pt="2"
              pb="1"
              px="2"
              display="flex"
              alignItems="flex-end"
            >
              <Text fontWeight="500" fontSize={isMobile ? 'sm' : 'lg'}>{title}</Text>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
});
