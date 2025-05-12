import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import { useInfinityAllNotes } from 'shared/api/hooks/useInfinityAllNotes';
import { NoteItem } from 'shared/modules/noteTab/components/NoteItem';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';

type Props = {
  noteId: string;
  scrollRestoration?: boolean;
  onScrollRestoration?: () => void;
};

const filters = {};
const options = {};
export const AllNotesList = React.memo((props: Props) => {
  const { noteId, scrollRestoration = true, onScrollRestoration } = props;

  const { 
    data, 
    isFetching,
    isFetched,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isError,
    errorUpdatedAt,
  } = useInfinityAllNotes(noteId, filters, options);

  const flatData = React.useMemo(() => ((data?.pages?.map(({ items }) => items).reverse() || []).flat()), [data]);

  console.log('flatData', flatData);
  return (
    <>
      <Box flexGrow={data ? '1' : '0'}>
        <Stack gap="4">
          {flatData.map((noteId) => (
            <NoteItem
              key={noteId}
              noteId={noteId}
              parentId={noteId}
            />
          ))}
        </Stack>
      </Box>
    
      {scrollRestoration && <TabScrollRestoration onScrollRestoration={onScrollRestoration} />}
    </>
  );
});
