import { IconButton } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useColorMode } from 'shared/components/ui/color-mode';
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
          size="xs"
          aria-label="User menu"
          variant="outline"
          colorScheme="brand"
        >
          <BsThreeDotsVertical />
        </MenuTrigger>
        <MenuList>
          <MenuItem
            label={<><FiUser /> Profile</>}
            onClick={handleProfileClick}
          />
          <MenuItem
            label={<><TbSettings2 /> Settings</>}
            onClick={handleSettingsClick}
          />
          <MenuDivider />
          <MenuItem
            label={<><TbLogout2 /> Logout</>}
            colorScheme="red"
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
