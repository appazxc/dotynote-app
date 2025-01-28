import { Box, Center, IconButton, IconButtonProps } from '@chakra-ui/react';
import { useLongPress } from '@uidotdev/usehooks';
import React from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { GoHome, GoPlus, GoSearch } from 'react-icons/go';
import { RxHamburgerMenu, RxReader } from 'react-icons/rx';

import { useColorModeValue } from 'shared/components/ui/color-mode';
import { modalIds } from 'shared/constants/modalIds';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { useBrowserLocation } from 'shared/hooks/useBrowserLocation';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsPrimareNote } from 'shared/hooks/useIsPrimaryNote';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAudio } from 'shared/modules/noteAudio/AudioProvider';
import { toggleMobileWidget } from 'shared/modules/noteAudio/audioSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { createPrimaryNoteTab } from 'mobile/actions/createPrimaryNoteTab';
import { HomeMenu } from 'mobile/containers/FooterNavigation/HomeMenu';
import { SoundMenu } from 'mobile/containers/FooterNavigation/SoundMenu';

export const FooterNavigation = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeSpace = useAppSelector(selectActiveSpace);
  const navigate = useBrowserNavigate();
  const { pathname } = useBrowserLocation();
  const borderColor = useColorModeValue('gray.600', 'gray.300');
  const isPrimaryNote = useIsPrimareNote();
  const { activeAudioId } = useAudio();
  const { isMobileWidgetOpen } = useAppSelector(state => state.audio);

  const tabsButtonProps = useLongPress(
    () => navigate({ to: '/app' }),
    { threshold: 500 }
  );

  const buttons = React.useMemo(() => {
    return [
      {
        label: 'home',
        onClick: () => {
          if (!activeSpace) {
            return;
          }

          if (!activeSpace.mainNoteId) {
            dispatch(showModal({ id: modalIds.primaryNote }));
            return;
          }

          if (isPrimaryNote) {
            dispatch(createPrimaryNoteTab());
          } else {
            navigate({ to: '/app/primary' });
          }
        },
        icon: <GoHome size="25" />,
        getMenu: activeSpace ? (
          { key, isActive, ...triggerProps }: { key: string, isActive: boolean } & IconButtonProps
        ) => {
          return (
            <HomeMenu key={key} {...triggerProps} />
          );
        } : undefined,
        _icon: { h: 'auto', w: 'auto' },
        isActive: pathname === '/app/primary',
      },
      {
        label: 'search',
        onClick: () => {
          navigate({ to: '/app/search' });
        },
        icon: <GoSearch size="25" />,
        isActive: pathname === '/app/search',
      },
      {
        label: 'app',
        onClick: () => {
          navigate({ to: '/app' });
        },
        icon: <RxReader size="25" />,
        isActive: pathname === '/app',
      },
      {
        label: 'tabs',
        onClick: () => {
          navigate({ to: '/app/tabs' });
        },
        icon: <Center
          w="6"
          h="6"
          rounded="sm"
          borderWidth="2px"
          borderColor={pathname === '/app/tabs' ? 'purple.500' : borderColor}
          fontSize="sm"
        >
          {activeSpace?.tabs.length ? (
            activeSpace.tabs.length
          ) : <GoPlus />}
        </Center>,
        ...tabsButtonProps,
        onContextMenu: (event) => {
          event.preventDefault();
        },
        isActive: pathname === '/app/tabs',
      },
      ...activeAudioId && !isMobileWidgetOpen ? [{
        label: 'media',
        onClick: () => {
          dispatch(toggleMobileWidget());
        },
        icon: <SoundMenu />,
      }] : [],
      {
        label: 'menu',
        onClick: () => {
          navigate({ to: '/app/menu' });
        },
        icon: <RxHamburgerMenu size="25" />,
        isActive: pathname === '/app/menu',
      },
    ];
  }, [
    dispatch,
    tabsButtonProps,
    borderColor,
    navigate,
    activeSpace,
    isPrimaryNote,
    pathname,
    activeAudioId,
    isMobileWidgetOpen,
  ]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        h="44px"
        px="4"
      >
        {buttons.map(({ label, icon, onClick, getMenu, isActive, ...rest }) => {
          const props = {
            size: 'md' as const,
            'aria-label': label,
            children: icon,
            onClick: onClick,
            variant: 'plain' as const,
            display: 'inline-flex',
            colorScheme: 'brand',
            color: isActive ? 'purple.500' : undefined,
            ...rest,
          };

          return getMenu 
            ? getMenu({ ...props, key: label, isActive }) 
            : (
              <IconButton
                key={label}
                {...props}
                _icon={{ w: 'auto', h: 'auto' }}
              />
            );
        })}
      </Box>
      <PrimaryNoteModal />
    </>
  );
});