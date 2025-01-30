import { Box, Text, Center, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

import { useNotes } from 'shared/api/hooks/useNotes';
import { PAGE_SIZE } from 'shared/constants/queryKeys';
import { MAX_PAGE_SIZE } from 'shared/constants/requests';

type Props = {
  value: string,
  renderNote: (id: number) => React.ReactNode,
};

export const SearchResults = React.memo((props: Props) => {
  const { value, renderNote } = props;
  
  const { data, isLoading } = useNotes({ filters: { [PAGE_SIZE]: MAX_PAGE_SIZE, query: value } });

  if (isLoading) {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    );
  } else if (!data || data.length === 0) {
    return (
      <Center h="full">
        <Text>Notes not found</Text>
      </Center>
    );
  }
  
  return (
    <Box pb="10">
      <VStack gap="4" alignItems="stretch">
        {data.map(renderNote)}
      </VStack>
    </Box>
  );
});
