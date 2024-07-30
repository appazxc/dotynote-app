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
  useDisclosure
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { BsPlus } from 'react-icons/bs';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFeather, PiFileAudioFill, PiMusicNotes, PiVideo } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';
import { VscRecord } from 'react-icons/vsc';

import { entityApi } from 'shared/api/entityApi';
import { queryClient } from 'shared/api/queryClient';
import { modalIds } from 'shared/constants/modalIds';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { EditPostSettingsModal } from 'shared/containers/modals/EditPostSettingsModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { addTo } from 'shared/modules/space/tabRoutes/note/constants';
import { useNoteTabId } from 'shared/modules/space/tabRoutes/note/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/space/tabRoutes/note/lib/noteTabStore';
import { noteSelector } from 'shared/selectors/entities';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateAddTo } from 'shared/store/slices/appSlice';
import { PostSettingsEntity } from 'shared/types/entities/PostSettingsEntity';

const ICON_SIZE = 24;

const extraId = 'sidebarPlusMenu';

const Cards = ({ items }) => {
  return (
    <Box minH="180px" pt="3">
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
        {items.map(({ title, icon, isDisabled, onClick }) => {
          return (
            <Card
              key={title}
              padding="small"
              cursor={isDisabled ? 'default': 'pointer'}
              opacity={isDisabled ? '0.6': '1'}
              onClick={onClick}
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

const NoteContent = () => {
  const dispatch = useAppDispatch();

  const items = React.useMemo(() => {
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
    <Cards items={items} />
  );
};

const PostsContent = ({ note, onClose }) => {
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: (postSettings: Partial<PostSettingsEntity>) => {
      return entityApi.note.createRelation(note.id, 'postSettings', postSettings);
    },
    onSuccess() {

    },
  });

  const handleClick = React.useCallback(() => {
    mutate({}, {
      onSuccess: () => {
        onClose();
        dispatch(showModal({ id: modalIds.editPostSettings, extraId }));
      },
    });
  }, [mutate, dispatch, onClose]);

  const renderedCards = React.useMemo(() => {
    const items = [
      {
        title: 'Text',
        icon: <SlNotebook size={ICON_SIZE} />,
        onClick: () => {
          onClose();
          dispatch(showModal({ id: modalIds.createPost, extraId }));
        },
      },
    ];

    return (
      <Cards items={items} />
    );
  }, [dispatch, onClose]);

  return (
    note.postSettingsId 
      ? renderedCards
      : (
        <Center minH="200px">
          <Button
            onClick={handleClick}
            isDisabled={isPending}
          >
            Create posts
          </Button>
        </Center>
      )
  );
};

type Props = { 
  canAddToNote: boolean,
  canAddToPosts: boolean,
  noteId: string 
};
 
const SidebarPlusMenuComponent = ({ noteId, canAddToNote, canAddToPosts, ...rest }: Props, ref) => {
  const dispatch = useAppDispatch();
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const noteContent = addToState === addTo.NOTE;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const noteTabId = useNoteTabId();
  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    queryClient.invalidateQueries({ queryKey });
  }, [noteTabId]);
  
  if (!note) {
    return null;
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="right-start"
        returnFocusOnClose={false}
        // isLazy
      >
        <PopoverTrigger>
          <IconButton
            ref={ref}
            size="sm"
            tabIndex={0}
            variant="ghost"
            position="relative"
            aria-label="Note add"
            icon={<BsPlus size="22px" />}
            {...rest}
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
                {canAddToNote && (
                  <Button
                    size="xs"
                    variant={noteContent ? 'solid' :'ghost'}
                    onClick={() => dispatch(updateAddTo(addTo.NOTE))}
                  >
                    Note
                  </Button>
                )}
                {canAddToNote && canAddToPosts && '/'}
                {canAddToPosts && (
                  <Button
                    size="xs"
                    variant={noteContent ? 'ghost' :'solid'}
                    onClick={() => dispatch(updateAddTo(addTo.POSTS))}
                  >
                    Posts
                  </Button>
                )}
              </Box>
            </Box>
            {noteContent ? <NoteContent /> : <PostsContent note={note} onClose={onClose} />}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <EditPostSettingsModal noteId={noteId} extraId={extraId} />
      <CreatePostModal
        noteId={noteId}
        extraId={extraId}
        onCreate={handlePostCreate}
      />
    </>
  );
};

export const SidebarPlusMenu = React.memo(React.forwardRef(SidebarPlusMenuComponent));