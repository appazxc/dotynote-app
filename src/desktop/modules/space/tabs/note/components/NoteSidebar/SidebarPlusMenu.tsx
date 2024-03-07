import React from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill, PiMusicNotes, PiVideo } from 'react-icons/pi';
import { VscRecord } from 'react-icons/vsc';

import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

const NoteContent = () => {
  const dispatch = useAppDispatch();

  const items = React.useMemo(() => {
    const ICON_SIZE = 24;

    return [
      {
        icon: <IoImageOutline size={ICON_SIZE} />,
        title: 'Image',
        onClick: () => {
          dispatch(showModal({ id: modalIds.createNote }));
        },
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
  }, [dispatch]);

  return (
    <Box minH="180px" pt="3">
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
        {items.map(({ title, icon, isDisabled }) => {
          return (
            <Card
              key={title}
              padding="small"
              cursor={isDisabled ? 'default': 'pointer'}
              opacity={isDisabled ? '0.6': '1'}
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
                <Text fontWeight="500" fontSize="sm">{title}</Text>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

const PostsContent = ({ onClose }) => {
  return (
    <Center minH="200px">
      <Button onClick={onClose}>Create posts</Button>
    </Center>
  );
};

export const SidebarPlusMenu = () => {
  const [noteContent, setNoteContent] = useBoolean(true);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="right-start"
      // closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Note add"
          icon={<BsPlus size="22px" />}
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent width="md">
        <PopoverBody>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize="sm" fontWeight="500">Add to</Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="2"
            >
              <Button
                size="xs"
                variant={noteContent ? 'solid' :'ghost'}
                onClick={setNoteContent.toggle}
              >
                Note
              </Button>
              /
              <Button
                size="xs"
                variant={noteContent ? 'ghost' :'solid'}
                onClick={setNoteContent.toggle}
              >
                Posts
              </Button>
            </Box>
          </Box>
          {noteContent ? <NoteContent /> : <PostsContent onClose={onClose} />}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
