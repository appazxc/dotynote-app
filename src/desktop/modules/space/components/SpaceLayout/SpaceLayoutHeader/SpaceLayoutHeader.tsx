import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpace, selectSortedSpaceTabs } from 'shared/store/slices/appSlice';
import { BsThreeDotsVertical, BsPlus } from 'react-icons/bs';
import { GoDotFill } from "react-icons/go";
import { SpaceTab } from './SpaceTab';
import { createTab } from 'shared/actions/space/createTab';
import { openMainSpaceNote } from 'shared/actions/space/openMainSpaceNote';

export const SpaceLayoutHeader = React.memo(() => {
  const tabIds = useAppSelector(selectSortedSpaceTabs);
  const space = useAppSelector(selectActiveSpace);
  const dispatch = useAppDispatch();

  const handlePlusClick = React.useCallback(() => {
    if (!space) return;

    dispatch(createTab({ spaceId: space.id, makeActive: true }));
  }, [dispatch, space]);

  return (
    <>
      <Box
        w="full"
        px="2"
        py="2"
        display="flex"
        alignItems="center"
        flexShrink="0"
      >
        <Box flexGrow="1"   overflow="hidden">
          <Box
            display="flex"
            alignItems="center"
            flexGrow="1"
          >
            <IconButton
              size="sm"
              aria-label="Side note menu"
              icon={<GoDotFill size="30" />}
              variant="outline"
              onClick={() => dispatch(openMainSpaceNote())}
            />
            <Box mx="2" color="gray">|</Box>
            <Box flexGrow="1" overflow="hidden">
              <Box
                display="flex"
                flexDirection="row"
                gap="1"
                flexGrow="1"
              >
                {tabIds.map(id => <SpaceTab key={id} id={id} />)}
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
            
          </Box>
        </Box>
        
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="2"
          flexShrink="0"
        >
          <IconButton
            size="sm"
            aria-label="User menu"
            icon={<BsThreeDotsVertical />}
            variant="outline"
          />
        </Box>
      </Box>
    </>
  );
});
