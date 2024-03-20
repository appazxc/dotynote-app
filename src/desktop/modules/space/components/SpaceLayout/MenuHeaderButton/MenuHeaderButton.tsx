import React from 'react';

import { IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { logout } from 'shared/actions/auth';
import { drawerIds } from 'shared/constants/drawerIds';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideDrawer, showDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
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

  return (
    <>
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
    </>
  );
});
