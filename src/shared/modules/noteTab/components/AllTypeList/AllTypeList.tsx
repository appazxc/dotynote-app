import { Box, Stack } from '@chakra-ui/react';
import { isBoolean, pick } from 'lodash';
import React from 'react';

import { InfinityNoteFilters, useInfinityNoteList } from 'shared/api/hooks/useInfinityNoteList';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { DEFAULT_PAGE_SIZE } from 'shared/constants/requests';
import { getIsSelected } from 'shared/modules/noteTab/components/AllTypeList/helpers/getIsSelected';
import { NoteItem } from 'shared/modules/noteTab/components/NoteItem';
import { PostsLoader } from 'shared/modules/noteTab/components/PostsLoader';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { NoteFiltersEntity } from 'shared/types/entities/NoteFiltersEntity';

type Props = {
  noteId: string;
  search?: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  selectedNotes?: string[];
  scrollRestoration?: boolean;
  filters?: NoteFiltersEntity;
  onScrollRestoration?: () => void;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (id: string) => void;
};

const options = {};

export const getInfinityAllTypeQueryKey = (noteId: string, filters: InfinityNoteFilters = {}) => 
  ['posts', noteId, 'all-notes', filters] as const;

export type InfinityAllTypeQueryKey = ReturnType<typeof getInfinityAllTypeQueryKey>;

export const AllTypeList = React.memo((props: Props) => {
  const { 
    noteId, 
    search,
    scrollRestoration = true, 
    isSelecting = false, 
    selectedNotes = EMPTY_ARRAY,
    hasOverlay = false,
    onOverlayClick, 
    onScrollRestoration, 
    filters: propsFilters,
  } = props;

  const filters = React.useMemo(() => {
    const data: InfinityNoteFilters = {
      pageSize: DEFAULT_PAGE_SIZE,
      ...pick(propsFilters, ['sort', 'orderBy', 'hasVideo', 'hasAudio', 'hasImage', 'hasFile', 'hasRecord']),
    };

    if (search) {
      data.query = search;
    }

    return data;
  }, [propsFilters, search]);
  
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
    filters,
    options,
    getQueryKey: getInfinityAllTypeQueryKey,
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
