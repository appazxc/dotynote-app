import React from 'react';

import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { BsPlus, BsThreeDotsVertical } from 'react-icons/bs';

import { logout } from 'shared/actions/auth';
import { createTab } from 'shared/actions/space/createTab';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { ChakraBox } from 'shared/components/ChakraBox';
import { drawerIds } from 'shared/constants/drawerIds';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideDrawer, showDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { MainHeaderButton } from 'desktop/modules/space/components/SpaceLayout/MainHeaderButton';

import { SpaceTab } from './SpaceTab';

export const SpaceLayoutHeader = React.memo(() => {
  const { data: tabIds } = useSpaceTabs({ sorted: true });
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  
  const handlePlusClick = React.useCallback(() => {
    dispatch(createTab({ makeActive: true }));
  }, [dispatch]);

  const handleColorModeChange = React.useCallback(() => {
    dispatch(showModal({ id: modalIds.confirm, extraId: 'confirmColorChange' }));
  }, [dispatch]);
  
  const handleDrawerOpen = React.useCallback(() => {
    dispatch(showDrawer({ id: drawerIds.confirm }));
  }, [dispatch]);

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
                as={motion.div}
                display="flex"
                layout
                flexDirection="row"
                gap="1"
                flexGrow="1"
              >
                <LayoutGroup>
                  {tabIds && tabIds.map((id, index) => (
                    <SpaceTab
                      key={id}
                      id={id}
                      isLast={tabIds.length === index + 1}
                    />
                  ))}
                  <ChakraBox layout>
                    <IconButton
                      size="sm"
                      aria-label="Add"
                      icon={<BsPlus size="22px" />}
                      borderRadius="full"
                      variant="ghost"
                      onClick={handlePlusClick}
                    />
                  </ChakraBox>
                </LayoutGroup>

              </Box>
            </Box>
            
          </Box>
        </Box>
        
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          ml="1"
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
              <MenuItem onClick={handleColorModeChange}>
                Change mode to {colorMode === 'light' ? 'Dark' : 'Light'}
              </MenuItem>
              <MenuItem onClick={handleDrawerOpen}>Open Drawer confirm</MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </MenuList>
          </Menu>

          <ConfirmModal
            title="Изменение цветовой темы"
            description={`Подтвердите изменение темы на ${colorMode === 'light' ? 'Dark' : 'Light'}`}
            extraId="confirmColorChange"
            onConfirm={() => {
              dispatch(hideModal());
              toggleColorMode();
            }}
          />
          
          <ConfirmDrawer
            title="Изменение цветовой темы"
            description={`Подтвердите изменение темы на ${colorMode === 'light' ? 'Dark' : 'Light'}`}
            onConfirm={() => {
              dispatch(hideDrawer());
              toggleColorMode();
            }}
          />
        </Box>
      </Box>
    </>
  );
});
