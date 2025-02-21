import {
  Box,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

import { NoteDialogs } from 'shared/components/NoteDialogs';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'shared/components/ui/popover';
import { ContentPicker } from 'shared/modules/noteTab/components/ContentPicker';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

type Props = { 
  canAddToNote: boolean;
  canAddToPosts: boolean;
  noteId: number;
};
 
const SidebarPlusMenuComponent = ({ noteId, canAddToNote, canAddToPosts, ...rest }: Props, ref) => {
  const { open, onClose, onOpen } = useDisclosure();
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  
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
              onClose={onClose}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      <NoteDialogs noteId={noteId} />
    </>
  );
};

export const SidebarPlusMenu = React.memo(React.forwardRef(SidebarPlusMenuComponent));