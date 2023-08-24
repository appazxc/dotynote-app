import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { createSpaceTab, selectActiveSpace, selectActiveSpaceTabs } from 'shared/store/slices/appSlice';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BsThreeDotsVertical, BsPlus } from 'react-icons/bs';

import { SpaceTab } from './SpaceTab';
import { useNoteMenuRefContext } from '../SpaceMenuRefProvider';

export const SpaceLayoutHeader = () => {
  const spaceTabs = useAppSelector(selectActiveSpaceTabs);
  const space = useAppSelector(selectActiveSpace);
  const noteMenuRef = useNoteMenuRefContext();
  const dispatch = useAppDispatch();

  const handlePlusClick = React.useCallback(() => {
    if (!space) return;

    dispatch(createSpaceTab({ spaceId: space.id }));
  }, [dispatch, space]);

  return (
    <Box
      w="full"
      px="2"
      py="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexShrink="0"
    >
      <Box
        display="flex"
        alignItems="center"
        flexGrow="1"
      >
        <IconButton
          size="sm"
          aria-label="Side note menu"
          icon={<AiOutlineMenuUnfold />}
          variant="outline"
        />
        <Box mx="2" color="gray">|</Box>
        <Box
          display="flex"
          flexDirection="row"
          gap="1"
          flexGrow="1"
        >
          {spaceTabs.map(id => <SpaceTab key={id} id={id} />)}
          <IconButton
            size="sm"
            aria-label="Add"
            icon={<BsPlus size="22px" />}
            borderRadius="full"
            variant="ghost"
            onClick={handlePlusClick}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <div ref={noteMenuRef} />
        <IconButton
          size="sm"
          aria-label="User menu"
          icon={<BsThreeDotsVertical />}
          variant="outline"
        />
      </Box>
    </Box>
  );
};
