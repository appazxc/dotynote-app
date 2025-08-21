import { IconButton, Stack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { openTab } from 'shared/actions/space/openTab';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { RemainingCredits } from 'shared/components/RemainingCredits';
import { useColorMode } from 'shared/components/ui/color-mode';
import { DotsIcon, SearchIcon } from 'shared/components/ui/icons';
import { UpdateAvailability } from 'shared/components/UpdateAvailability';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { router } from 'desktop/routes/router';

export const MenuHeaderButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isCreditsAlmostFinished, isStorageLimitReached } = useUserBalanceInfo();

  const handleSettingsClick = React.useCallback(() => {
    navigate({ to: '/app/settings' });
  }, [navigate]);

  const handleProfileClick = React.useCallback(() => {
    navigate({ to: '/app/profile' });
  }, [navigate]);

  const handleSearchClick = React.useCallback(() => {
    dispatch(openTab({
      path: '/search',
      active: true,
    }));
  }, [dispatch]);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuTrigger>
          <IconButton 
            size="xs"
            aria-label="User menu"
            variant={isCreditsAlmostFinished || isStorageLimitReached ? 'subtle' : 'ghost'}
            rotate="90"
            colorPalette={isStorageLimitReached ? 'red' : isCreditsAlmostFinished ? 'yellow' : 'gray'}
          >
            <DotsIcon />
          </IconButton>
        </MenuTrigger>
        <MenuList minW="200px">
          <Stack gap="2">
            <RemainingCredits size="sm" />
            <UpdateAvailability size="sm" />
          </Stack>
          <MenuItem
            label={<><FiUser /> Profile</>}
            onClick={handleProfileClick}
          />
          <MenuItem
            label={<><TbSettings2 /> Settings</>}
            onClick={handleSettingsClick}
          />
          <MenuItem
            label={<><SearchIcon strokeWidth="0.5" /> Search</>}
            onClick={handleSearchClick}
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
