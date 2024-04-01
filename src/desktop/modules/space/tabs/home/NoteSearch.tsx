import React from 'react';

import { Box, Text, Center, Spinner, VStack } from '@chakra-ui/react';

import { useNotes } from 'shared/api/hooks/useNotes';
import { Post } from 'shared/components/Post';
import { PAGE_SIZE } from 'shared/constants/queryKeys';
import { MAX_PAGE_SIZE } from 'shared/constants/requests';

type Props = {
  value: string,
}
export const NoteSearch = React.memo((props: Props) => {
  const { value } = props;
  
  const { data, isLoading } = useNotes({ filters: { [PAGE_SIZE]: MAX_PAGE_SIZE, query: value } });
  console.log('data', data);

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
    <Box
      pt="10"
    >
      <VStack gap="4" alignItems="stretch">
        {data.map(id => (
          <Post key={id} noteId={id} />
        ))}
      </VStack>
    </Box>
  );
});
