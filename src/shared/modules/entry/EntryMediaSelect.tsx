import React from 'react';

import { Box, Button, Text } from '@chakra-ui/react';

import { addTo } from 'shared/modules/space/tabRoutes/note/constants';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateAddTo } from 'shared/store/slices/appSlice';

type Props = {
  canAddToNote: boolean,
  canAddToPosts: boolean,
  noteId: number,
};

export const EntryMediaSelect = React.memo((props: Props) => {
  const {
    noteId,
    canAddToNote,
    canAddToPosts,
  } = props;
  const dispatch = useAppDispatch();
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const isNoteMedia = addToState === addTo.NOTE;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box color="chakra-body-text">
        <Text
          fontSize="sm"
          fontWeight="500"
        >
                Add
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="2"
        color="chakra-body-text"
      >
        <Text fontSize="sm" fontWeight="500">to</Text>
        {canAddToNote && (
          <Button
            size="xs"
            variant={isNoteMedia ? 'solid' : 'ghost'}
            onClick={() => dispatch(updateAddTo(addTo.NOTE))}
          >
            Note
          </Button>
        )}
        {canAddToNote && canAddToPosts && '/'}
        {canAddToPosts && (
          <Button
            size="xs"
            variant={isNoteMedia ? 'ghost' : 'solid'}
            onClick={() => dispatch(updateAddTo(addTo.POSTS))}
          >
            Posts
          </Button>
        )}
      </Box>
    </Box>
  );
});
