import React from 'react';

import {
  IconButton,
  LightMode,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

import { queryClient } from 'shared/api/queryClient';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { EditPostsSettingsModal } from 'shared/containers/modals/EditPostsSettingsModal';
import { EntryMediaContent } from 'shared/modules/entry/EntryMediaContent';
import { EntryMediaSelect } from 'shared/modules/entry/EntryMediaSelect';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

const extraId = 'sidebarPlusMenu';

type Props = { 
  canAddToNote: boolean,
  canAddToPosts: boolean,
  noteId: number,
};
 
const SidebarPlusMenuComponent = ({ noteId, canAddToNote, canAddToPosts, ...rest }: Props, ref) => {
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
        isLazy
        isOpen={isOpen}
        placement="right-start"
        returnFocusOnClose={false}
        onClose={onClose}
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
        <LightMode>
          <PopoverContent width="md">
            <PopoverBody
              gap="4"
              display="flex"
              flexDirection="column"
            >
              <EntryMediaSelect
                noteId={noteId}
                canAddToNote={canAddToNote}
                canAddToPosts={canAddToPosts}
              />
              <EntryMediaContent
                noteId={noteId}
                createPostModalExtraId={extraId}
                editPostsSettingsModalExtraId={extraId}
                onFinish={onClose}
              />
            </PopoverBody>
          </PopoverContent>
        </LightMode>
      </Popover>

      <EditPostsSettingsModal noteId={noteId} extraId={extraId} />
      <CreatePostModal
        noteId={noteId}
        extraId={extraId}
        onCreate={handlePostCreate}
      />
    </>
  );
};

export const SidebarPlusMenu = React.memo(React.forwardRef(SidebarPlusMenuComponent));