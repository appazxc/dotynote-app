import React from 'react';

import { Box, Center, Text } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { AnimatePresence } from 'framer-motion';

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
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const userId = useAppSelector(selectUserId);
  const [search, setSearch] = React.useState('');
  const { isSearchActive } = useAppSelector(state => state.app.note);

  invariant(note, 'Missing note');
  invariant(userId, 'Missing userId');

  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const isWriteMode = rwMode === rwModes.WRITE;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    setSearch('');
  }, [note.id]);

  const debouncedSearch = useDebounce(search, 500);

  if (note._isDeleted) {
    return (
      <Center h="full">
        <Text color="gray.500">
          Note is deleted.
        </Text>
      </Center>
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
            showSearch={!!note.postsSettingsId}
          />
        )}
        header={(
          <AnimatePresence>
            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              bg="body"
              zIndex="1"
            >
              <NoteHeader
                isWriteMode={isWriteMode}
                search={search}
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
        <Box pt={isSearchActive ? '80px' : '50px'}>
          <NoteTabContent
            key={note.id}
            note={note}
            search={debouncedSearch}
            isSearchActive={isSearchActive}
            isWriteMode={isWriteMode}
          />
        </Box>
      </TabLayout>
    </NoteProviders>
  );
});

export default NoteTab;