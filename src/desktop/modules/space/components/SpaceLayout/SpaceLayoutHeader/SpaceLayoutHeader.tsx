import React from 'react';

import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode, useTheme } from '@chakra-ui/react';
import { BsPlus, BsThreeDotsVertical } from 'react-icons/bs';

import { createTab } from 'shared/actions/space/createTab';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpace, selectSortedSpaceTabs } from 'shared/store/slices/appSlice';

import { MainHeaderButton } from 'desktop/modules/space/components/SpaceLayout/MainHeaderButton';

import { SpaceTab } from './SpaceTab';

export const SpaceLayoutHeader = React.memo(() => {
  const tabIds = useAppSelector(selectSortedSpaceTabs);
  const space = useAppSelector(selectActiveSpace);
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  console.log('theme', theme);
  
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
        <Box flexGrow="1" overflow="hidden">
          <Box
            display="flex"
            alignItems="center"
            flexGrow="1"
          >
            <MainHeaderButton />
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
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              size="sm"
              aria-label="User menu"
              icon={<BsThreeDotsVertical />}
              variant="outline"
              colorScheme="brand"
              onContextMenu={() => {
                console.log('here');
              
              }}
            />
            <MenuList>
              <MenuItem onClick={toggleColorMode}>Change mode to {colorMode === 'light' ? 'Dark' : 'Light'}</MenuItem>
              <MenuItem>Open Closed Tab</MenuItem>
              <MenuItem>Open File</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
});
