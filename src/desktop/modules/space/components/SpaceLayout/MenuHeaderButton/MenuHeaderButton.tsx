import React from 'react';

import { IconButton, useColorMode } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { router } from 'desktop/routes/router';

export const MenuHeaderButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

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
          <MenuItem
            leftIcon={<FiUser />}
            label="Profile"
            onClick={handleProfileClick}
          />
          <MenuItem
            leftIcon={<TbSettings2 />}
            label="Settings"
            onClick={handleSettingsClick}
          />
          <MenuDivider />
          <MenuItem
            leftIcon={<TbLogout2 />}
            colorScheme="red"
            label="Logout"
            onClick={() => {
              dispatch(logout());
              router.navigate({ to: '/' });
            }}
          />
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
