import React from 'react';

import { Center, Spinner, Text, Box, VStack } from '@chakra-ui/react';

import { useNotes } from 'shared/api/hooks/useNotes';

import { NoteItem } from './NoteItem';

type Props = {
  query: string,
  onClick?: (id: string) => void,
}

const CenterBox = ({ children }: React.PropsWithChildren) => <Center h="full">{children}</Center>;

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

  if (isLoading) return <CenterBox><Spinner /></CenterBox> ;

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
        <CenterBox><Text>Notes not found</Text></CenterBox>  
      )}
    </Box>
  );
}
