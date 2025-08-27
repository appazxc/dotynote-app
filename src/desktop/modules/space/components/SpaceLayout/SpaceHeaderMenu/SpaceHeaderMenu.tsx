import { IconButton, Stack } from '@chakra-ui/react';
import { invariant, useNavigate } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { MdOutlineFeedback } from 'react-icons/md';
import { MdWorkspacesOutline } from 'react-icons/md';
import { PiNotebookDuotone } from 'react-icons/pi';
import { RiHome2Line } from 'react-icons/ri';
import { TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { openTab } from 'shared/actions/space/openTab';
import { useSpaces } from 'shared/api/hooks/useSpaces';
import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { RemainingCredits } from 'shared/components/RemainingCredits';
import { useColorMode } from 'shared/components/ui/color-mode';
import { DotsIcon, SearchIcon } from 'shared/components/ui/icons';
import { toaster } from 'shared/components/ui/toaster';
import { UpdateAvailability } from 'shared/components/UpdateAvailability';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmDrawer } from 'shared/containers/drawers/ConfirmDrawer';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { FeedbackModal } from 'shared/containers/modals/FeedbackModal';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startPrimaryNoteOperation } from 'shared/store/slices/appSlice';

import { SpaceMenuItem } from 'desktop/modules/space/components/SpaceLayout/DotHeaderButton/SpaceMenuItem';
import { router } from 'desktop/routes/router';

export const SpaceHeaderMenu = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { data: spaceIds = [] } = useSpaces();
  const space = useAppSelector(selectActiveSpace);

  invariant(space, 'Missing space');

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

  const handleFeedbackClick = React.useCallback(() => {
    dispatch(showModal({
      id: modalIds.feedback,
    }));
  }, [dispatch]);

  const { mutate } = useUpdateSpace(space.id);

  const handleRemovePrimaryNote = React.useCallback(() => {
    mutate({
      mainNoteId: null,
    }, {
      onSuccess: () => {
        toaster.create({
          description: 'Primary note removed.',
        });
      },
    });
  }, [mutate]);

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
          
          <MenuDivider />

          <MenuSub
            label={<><MdWorkspacesOutline /> Spaces</>}
            onClick={() => {
              router.navigate({
                to: '/app/spaces',
              });
            }}
          >
            {spaceIds.map((id) => {
              return <SpaceMenuItem key={id} spaceId={id} />;
            })}
          </MenuSub>
          <MenuSub label={<><PiNotebookDuotone /> Primary note</>}>
            {space.mainNoteId && (
              <MenuItem
                label="Change"
                onClick={() => {
                  dispatch(startPrimaryNoteOperation());
                }}
              />
            )}
            {!space.mainNoteId && (
              <MenuItem
                label="Set"
                onClick={() => {
                  dispatch(showModal({ id: modalIds.primaryNote }));
                }}
              />
            )}
            {space.mainNoteId && (
              <>
                <MenuDivider />
                <MenuItem
                  label="Remove"
                  colorScheme="red"
                  onClick={handleRemovePrimaryNote}
                />
              </>
            )}
          </MenuSub>
          <MenuItem
            label={<><SearchIcon strokeWidth="0.5" /> Search</>}
            onClick={handleSearchClick}
          />
          <MenuDivider />
          <MenuItem
            label={<><MdOutlineFeedback /> Feedback</>}
            onClick={handleFeedbackClick}
          />
          <MenuDivider />
          <MenuItem
            label={<><RiHome2Line /> Home Page</>}
            onClick={() => {
              window.open(
                import.meta.env.MODE === 'production' 
                  ? 'https://dotynote.com/home' 
                  : 'http://localhost:3000/home', '_blank'
              );
            }}
          />
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
        title="Change color theme"
        description={`Confirm theme change to ${colorMode === 'light' ? 'Dark' : 'Light'}`}
        extraId="confirmColorChange"
        onConfirm={() => {
          dispatch(hideModal());
          toggleColorMode();
        }}
      />
          
      <ConfirmDrawer
        title="Change color theme"
        description={`Confirm theme change to ${colorMode === 'light' ? 'Dark' : 'Light'}`}
        onConfirm={() => {
          dispatch(hideDrawer());
          toggleColorMode();
        }}
      />
      <PrimaryNoteModal />
      <FeedbackModal />
    </>
  );
});
