import { Box, Center, Text } from '@chakra-ui/react';
import { useParams, useSearch } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { AnimatePresence } from 'motion/react';
import React from 'react';

import { NoteProviders } from 'shared/modules/noteTab/components/NoteProviders';
import { rwModes } from 'shared/modules/noteTab/constants';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { noteSelector } from 'shared/selectors/entities';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { NoteFooter } from 'desktop/modules/noteTab/NoteFooter';
import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteHeader } from './NoteHeader';
import { NoteSidebar } from './NoteSidebar';
import { NoteTabContent } from './NoteTabContent';

export const NoteTab = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });
  const { parent: parentId } = useSearch({ strict: false });
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const parent = useAppSelector(state => noteSelector.getEntityById(state, parentId));
  const userId = useAppSelector(selectUserId);
  const [search, setSearch] = React.useState('');
  const { isSearchActive } = useAppSelector(state => state.app.note);
  
  invariant(note, 'Missing note');
  invariant(userId, 'Missing userId');

  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId: note.id }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId: note.id }));
  const isWriteMode = rwMode === rwModes.WRITE;

  const debouncedSearch = useDebounce(search, isSearchActive ? 500 : 0);

  if (note._isDeleted) {
    return (
      <TabLayout defaultSidebar>
        <Center h="full">
          <Text color="gray.500">
            Note is deleted.
          </Text>
        </Center>
      </TabLayout>
    );
  }

  return (
    <NoteProviders
      id={note.id}
      isWriteMode={isWriteMode}
    >
      <TabLayout
        scrollRestoration={false}
        leftSide={(
          <NoteSidebar
            note={note}
            rwMode={rwMode}
            showRwMode={showRwMode}
            showSearch={!!note.postsSettings}
          />
        )}
        header={(
          <AnimatePresence>
            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              bg="bg"
              zIndex="1"
            >
              <NoteHeader
                isWriteMode={isWriteMode}
                search={search}
                note={note}
                onSearchChange={setSearch}
              />
            </Box>    
          </AnimatePresence>  
        )}
        footer={(
          <AnimatePresence>
            <NoteFooter />
          </AnimatePresence>  
        )}
      >
        <Box pt={isSearchActive ? '80px' : '50px'} h="full">
          <NoteTabContent
            key={note.id}
            note={note}
            parent={parent}
            search={debouncedSearch}
            isSearchActive={isSearchActive}
            isWriteMode={isWriteMode}
          />
        </Box>
      </TabLayout>
    </NoteProviders>
  );
});

NoteTab.displayName = 'NoteTab';

export default NoteTab;