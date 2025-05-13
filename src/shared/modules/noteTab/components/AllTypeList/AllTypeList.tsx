import { Box, Stack } from '@chakra-ui/react';
import React from 'react';

import { useInfinityNoteList } from 'shared/api/hooks/useInfinityNoteList';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { DEFAULT_PAGE_SIZE } from 'shared/constants/requests';
import { getIsSelected } from 'shared/modules/noteTab/components/AllTypeList/helpers/getIsSelected';
import { NoteItem } from 'shared/modules/noteTab/components/NoteItem';
import { PostsLoader } from 'shared/modules/noteTab/components/PostsLoader';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { NoteOrderBy } from 'shared/types/common';

type Props = {
  noteId: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  selectedNotes?: string[];
  scrollRestoration?: boolean;
  sort?: 'asc' | 'desc';
  orderBy?: NoteOrderBy;
  onScrollRestoration?: () => void;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (id: string) => void;
};

const options = {};

export const getInfinityAllNotesQueryKey = (noteId, filters) => 
  ['posts', noteId, 'all-notes', filters] as const;

export const AllTypeList = React.memo((props: Props) => {
  const { 
    noteId, 
    scrollRestoration = true, 
    isSelecting = false, 
    selectedNotes = EMPTY_ARRAY,
    hasOverlay = false,
    onOverlayClick, 
    onScrollRestoration, 
    sort = 'desc',
    orderBy = 'createdAt',
  } = props;

  const { 
    data, 
    flatData,
    isFetchingFirstTime,
    prevPageObserver,
    nextPageObserver,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfinityNoteList({
    noteId,
    path: `/notes/${noteId}/all`,
    filters: {
      pageSize: DEFAULT_PAGE_SIZE,
      sort,
      orderBy,
    },
    options,
    getQueryKey: getInfinityAllNotesQueryKey,
  });

  return (
    <>
      <Box flexGrow={data ? '1' : '0'}>
        {isFetchingFirstTime && <PostsLoader />}

        {nextPageObserver}
        {isFetchingNextPage && <PostsLoader />}
        <Stack gap="4">
          {flatData.map((id) => (
            <NoteItem
              key={id}
              noteId={id}
              parentId={noteId}
              isSelecting={isSelecting}
              hasOverlay={hasOverlay}
              isSelected={getIsSelected(id, isSelecting, selectedNotes)}
              onOverlayClick={onOverlayClick}
            />
          ))}
        </Stack>
        {isFetchingPreviousPage && <PostsLoader />}
        {prevPageObserver}
      </Box>
    
      {scrollRestoration && <TabScrollRestoration onScrollRestoration={onScrollRestoration} />}
    </>
  );
});
