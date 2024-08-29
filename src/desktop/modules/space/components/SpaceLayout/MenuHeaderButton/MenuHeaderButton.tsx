import React from 'react';

import { IconButton, useColorMode } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { TbLogout2, TbSettings2 } from 'react-icons/tb';
import { VscColorMode } from 'react-icons/vsc';

import { logout } from 'shared/actions/auth';
import { openTab } from 'shared/actions/space/openTab';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { drawerIds } from 'shared/constants/drawerIds';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideDrawer, showDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';
import { router } from 'desktop/routes/router';

export const MenuHeaderButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  
  const handleColorModeChange = React.useCallback(() => {
    dispatch(showModal({ id: modalIds.confirm, extraId: 'confirmColorChange' }));
  }, [dispatch]);
  
  const handleDrawerOpen = React.useCallback(() => {
    dispatch(showDrawer({ id: drawerIds.confirm }));
  }, [dispatch]);

  const handleSettingsClick = React.useCallback(() => {
    navigate({ to: '/app/settings' });
  }, [navigate]);

  const handleProfileClick = React.useCallback(() => {
    navigate({ to: '/app/profile' });
  }, [navigate]);

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
          <MenuItem leftIcon={<FiUser />} onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem leftIcon={<VscColorMode />} onClick={handleColorModeChange}>
            Change mode to {colorMode === 'light' ? 'Dark' : 'Light'}
          </MenuItem>
          <MenuItem leftIcon={<VscColorMode />} onClick={handleDrawerOpen}>Open Drawer confirm</MenuItem>
          <MenuItem leftIcon={<TbSettings2 />} onClick={handleSettingsClick}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem
            leftIcon={<TbLogout2 />}
            onClick={() => {
              dispatch(logout());
              router.navigate({ to: '/' });
            }}
            colorScheme="red"
          >
            Logout
          </MenuItem>
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
