import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useColorMode } from 'shared/components/ui/color-mode';
import { DotsIcon } from 'shared/components/ui/icons';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { SWContext } from 'shared/core/Providers/SWProvider';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { useReactContext } from 'shared/util/useReactContext';

import { router } from 'desktop/routes/router';

export const MenuHeaderButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isUpdateAvailable, updateSW } = useReactContext(SWContext);

  const handleSettingsClick = React.useCallback(() => {
    navigate({ to: '/app/settings' });
  }, [navigate]);

  const handleProfileClick = React.useCallback(() => {
    navigate({ to: '/app/profile' });
  }, [navigate]);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuTrigger>
          <IconButton 
            size="xs"
            aria-label="User menu"
            variant="ghost"
            colorScheme="brand"
            rotate="90"
          >
            <DotsIcon />
          </IconButton>
        </MenuTrigger>
        <MenuList minW="200px">
          {isUpdateAvailable && (
            <Box px="2" py="1">
              <Text color="colorPalette.info" fontSize="xs">New version available</Text>
              <Button
                w="full"
                variant="subtle"
                colorPalette="purple"
                size="xs"
                onClick={() => updateSW?.(true)}
              >
              Update
              </Button>
            </Box>
          )}
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
