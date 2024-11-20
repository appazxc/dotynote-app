import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { addTo } from 'shared/modules/noteTab/constants';
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
      gap="1"
      // justifyContent="space-between"
    >
      <Box color="chakra-body-text">
        <Text
          fontSize="sm"
          fontWeight="500"
        >
          Add to
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="2"
        color="chakra-body-text"
        fontSize="sm"
      >
        {canAddToNote && (
          <Button
            size="2xs"
            variant={isNoteMedia ? 'subtle' : 'ghost'}
            onClick={() => dispatch(updateAddTo(addTo.NOTE))}
          >
            Note
          </Button>
        )}
        {canAddToNote && canAddToPosts && '/'}
        {canAddToPosts && (
          <Button
            size="2xs"
            variant={isNoteMedia ? 'ghost' : 'subtle'}
            onClick={() => dispatch(updateAddTo(addTo.POSTS))}
          >
            Posts
          </Button>
        )}
      </Box>
    </Box>
  );
});
