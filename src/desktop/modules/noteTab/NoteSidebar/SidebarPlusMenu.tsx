import {
  Box,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

import { InfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'shared/components/ui/popover';
import { CreateNoteDotModal } from 'shared/containers/modals/CreateNoteDotModal';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { CreatePostWithImagesModal } from 'shared/containers/modals/CreatePostWithImagesModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { ContentPicker } from 'shared/modules/noteTab/components/ContentPicker';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { turnOnQueryNextPage } from 'shared/util/api/turnOnQueryNextPage';

type Props = { 
  canAddToNote: boolean,
  canAddToPosts: boolean,
  noteId: number,
};
 
const SidebarPlusMenuComponent = ({ noteId, canAddToNote, canAddToPosts, ...rest }: Props, ref) => {
  const dispatch = useAppDispatch();
  const { open, onClose, onOpen } = useDisclosure();
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const noteTabId = useNoteTabId(noteId);
  
  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    if (queryKey) {
      turnOnQueryNextPage(queryKey);
    }
    
    dispatch(hideModal());
  }, [noteTabId, dispatch]);
  
  if (!note) {
    return null;
  }

  return (
    <>
      <PopoverRoot
        lazyMount
        open={open}
        positioning={{ 
          placement: 'right-start',
        }}
        onOpenChange={(event) => {
          if (!event.open) {
            onClose();
          }
        }}
      >
        <PopoverTrigger asChild>
          <Box>
            <IconButton
              ref={ref}
              size="xs"
              tabIndex={0}
              variant="ghost"
              iconSize="auto"
              position="relative"
              aria-label="Note add"
              {...rest}
              onClick={onOpen}
            >
              <BsPlus size="22px" />
            </IconButton>
          </Box>
        </PopoverTrigger>
        <PopoverContent width="md">
          <PopoverBody
            gap="4"
            display="flex"
            flexDirection="column"
            py="3"
          >
            <ContentPicker
              noteId={noteId}
              canAddToNote={canAddToNote}
              canAddToPosts={canAddToPosts}
              onFinish={onClose}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      <CreatePostModal
        noteId={noteId}
        onCreate={handlePostCreate}
      />
      <CreatePostWithImagesModal
        noteId={noteId}
        onCreate={handlePostCreate}
      />
      <CreateNoteDotModal
        noteId={noteId}
      />
    </>
  );
};

export const SidebarPlusMenu = React.memo(React.forwardRef(SidebarPlusMenuComponent));