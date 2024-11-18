import {
  Box,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

import { queryClient } from 'shared/api/queryClient';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'shared/components/ui/popover';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { EntryMediaContent } from 'shared/modules/entry/EntryMediaContent';
import { EntryMediaSelect } from 'shared/modules/entry/EntryMediaSelect';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

type Props = { 
  canAddToNote: boolean,
  canAddToPosts: boolean,
  noteId: number,
};
 
const SidebarPlusMenuComponent = ({ noteId, canAddToNote, canAddToPosts, ...rest }: Props, ref) => {
  const { open, onClose, onOpen } = useDisclosure();
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const noteTabId = useNoteTabId(noteId);
  
  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    queryClient.invalidateQueries({ queryKey });
  }, [noteTabId]);
  
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
            <EntryMediaSelect
              noteId={noteId}
              canAddToNote={canAddToNote}
              canAddToPosts={canAddToPosts}
            />
            <EntryMediaContent
              noteId={noteId}
              onFinish={onClose}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      <CreatePostModal
        noteId={noteId}
        onCreate={handlePostCreate}
      />
    </>
  );
};

export const SidebarPlusMenu = React.memo(React.forwardRef(SidebarPlusMenuComponent));