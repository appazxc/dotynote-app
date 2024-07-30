import React from 'react';

import { Box, Text, Center, Spinner, VStack } from '@chakra-ui/react';

import { useNotes } from 'shared/api/hooks/useNotes';
import { Post } from 'shared/components/Post';
import { PAGE_SIZE } from 'shared/constants/queryKeys';
import { MAX_PAGE_SIZE } from 'shared/constants/requests';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

const Note = ({ noteId }: { noteId: number }) => {
  return (
    <DesktopTabLink
      to="/n/$noteId"
      params={{ noteId: String(noteId) }}  
    >
      <Post noteId={noteId} />
    </DesktopTabLink>
  );
};

type Props = {
  value: string;
};

export const NoteSearch = React.memo((props: Props) => {
  const { value } = props;
  
  const { data, isLoading } = useNotes({ filters: { [PAGE_SIZE]: MAX_PAGE_SIZE, query: value } });

  if (isLoading) {
    return (
      <Center minH="200">
        <Spinner />
      </Center>
    );
  } else if (!data || data.length === 0) {
    return (
      <Center minH="200">
        <Text>Notes not found</Text>
      </Center>
    );
  }
  
  return (
    <Box pt="10">
      <VStack gap="4" alignItems="stretch">
        {data.map(id => (
          <Note key={id} noteId={id} />
        ))}
      </VStack>
    </Box>
  );
});
