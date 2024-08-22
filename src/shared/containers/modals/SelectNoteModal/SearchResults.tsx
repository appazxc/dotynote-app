import React from 'react';

import { Center, Spinner, Text, Box, VStack } from '@chakra-ui/react';

import { useNotes } from 'shared/api/hooks/useNotes';

import { NoteItem } from './NoteItem';

type Props = {
  query: string,
  onClick?: (id: string) => void,
}

export function SearchResults({ query = '', onClick }: Props) {
  const {
    data,
    isLoading,
    isFetching,
    status,
  } = useNotes({
    filters: { query },
  }, { staleTime: 0 });
  console.log(data,
    isLoading,
    isFetching,
    status);

  const handleNoteClick = React.useCallback((value) => {
    onClick?.(value);
  }, [onClick]);

  if (isLoading) return <Center h="full"><Spinner /></Center> ;

  return (
    <Box h="full">
      {data && data.length > 0 ? (
        <VStack spacing="4" align="stretch">
          {data.map((id) => (
            <NoteItem
              key={id}
              id={id}
              onClick={handleNoteClick}
            />
          ))}
        </VStack>
      ) : (
        <Center h="full"><Text>Notes not found</Text></Center>  
      )}
    </Box>
  );
}
