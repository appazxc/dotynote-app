import React from 'react';

import { IconButton, useColorMode } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { logout } from 'shared/actions/auth';
import { openTab } from 'shared/actions/space/openTab';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { drawerIds } from 'shared/constants/drawerIds';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideDrawer, showDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { useAppDispatch } from 'shared/store/hooks';

export const MenuHeaderButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleColorModeChange = React.useCallback(() => {
    dispatch(showModal({ id: modalIds.confirm, extraId: 'confirmColorChange' }));
  }, [dispatch]);
  
  const handleDrawerOpen = React.useCallback(() => {
    dispatch(showDrawer({ id: drawerIds.confirm }));
  }, [dispatch]);

  const handleSettingsClick = React.useCallback(() => {
    dispatch(openTab({
      route: buildTabUrl({ routeName: tabRouteNames.settings }),
      makeActive: true,
    }));
  }, [dispatch]);

  const handleProfileClick = React.useCallback(() => {
    dispatch(openTab({
      route: buildTabUrl({ routeName: tabRouteNames.profile }),
      makeActive: true,
    }));
  }, [dispatch]);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuTrigger
          as={IconButton}
          size="sm"
          aria-label="User menu"
          icon={<BsThreeDotsVertical />}
          variant="outline"
          colorScheme="brand"
        />
        <MenuList>
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleColorModeChange}>
            Change mode to {colorMode === 'light' ? 'Dark' : 'Light'}
          </MenuItem>
          <MenuItem onClick={handleDrawerOpen}>Open Drawer confirm</MenuItem>
          <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => dispatch(logout())} colorScheme="red">Logout</MenuItem>
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
    </>
  );
});
