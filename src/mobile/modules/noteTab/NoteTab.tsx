import { Center, Text } from '@chakra-ui/react';
import { useDebounce } from '@uidotdev/usehooks';
import React from 'react';

import { useIsPrimareNote } from 'shared/hooks/useIsPrimaryNote';
import { NoteProviders } from 'shared/modules/noteTab/components/NoteProviders';
import { rwModes } from 'shared/modules/noteTab/constants';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { noteSelector } from 'shared/selectors/entities';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';
import { NoteFooter } from 'mobile/modules/noteTab/NoteFooter';

import { NoteHeader } from './NoteHeader';
import { NoteTabContent } from './NoteTabContent';

type Props = {
  noteId: string;
}

export const NoteTab = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const [search, setSearch] = React.useState('');
  const { isSearchActive } = useAppSelector(state => state.app.note);
  const isPrimary = useIsPrimareNote();
  const tab = useTabContext();
  
  invariant(note, 'Missing note');
  
  React.useEffect(() => {
    setSearch('');
  }, [note.id]);

  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const debouncedSearch = useDebounce(search, 500);
  const isWriteMode = rwMode === rwModes.WRITE;
  const isNoteContentVisible = !note.settings?.hide;

  if (note._isDeleted) {
    return (
      <Layout header={<LayoutHeader showBackButton isBackButtonDisabled={tab.routes.length <= 1} />}>
        <Center h="full">
          <Text color="gray.500">
            Note is deleted.
          </Text>
        </Center>
      </Layout>
    );
  }

  return (
    <NoteProviders
      id={note.id}
      isWriteMode={isWriteMode}
    >
      <Layout 
        header={(
          <NoteHeader
            key={note.id}
            isPrimary={isPrimary}
            note={note}
            search={search}
            onSearchChange={setSearch}
          />
        )} 
        footer={(
          <NoteFooter
            noteId={noteId}
            isWriteMode={isWriteMode}
            isNoteContentVisible={isNoteContentVisible}
          />
        )}
      >
        <NoteTabContent
          key={note.id}
          note={note}
          isWriteMode={isWriteMode}
          search={debouncedSearch}
          isSearchActive={isSearchActive}
        />
      </Layout>
    </NoteProviders>
  );
});