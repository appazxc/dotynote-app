import { Box, Center, IconButton, IconButtonProps } from '@chakra-ui/react';
import { useLongPress } from '@uidotdev/usehooks';
import React from 'react';
import { GoHome, GoPlus, GoSearch } from 'react-icons/go';
import { RxHamburgerMenu, RxReader } from 'react-icons/rx';

import { useColorModeValue } from 'shared/components/ui/color-mode';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { useBrowserLocation } from 'shared/hooks/useBrowserLocation';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsPrimaryNote } from 'shared/hooks/useIsPrimaryNote';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { toggleMobileWidget } from 'shared/modules/noteAudio/audioSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { createPrimaryNoteTab } from 'mobile/actions/createPrimaryNoteTab';
import { HomeMenu } from 'mobile/containers/FooterNavigation/HomeMenu';
import { SoundMenu } from 'mobile/containers/FooterNavigation/SoundMenu';
import { PRIMARY_NOTE_PATH } from 'mobile/routes/primaryNote/primaryNotePath';

export const FooterNavigation = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeSpace = useAppSelector(selectActiveSpace);
  const navigate = useBrowserNavigate();
  const { pathname } = useBrowserLocation();
  const borderColor = useColorModeValue('gray.600', 'gray.300');
  const isPrimaryNote = useIsPrimaryNote();
  const { isCreditsAlmostFinished, isStorageLimitReached } = useUserBalanceInfo();
  const { isMobileWidgetOpen, activeId } = useAppSelector(state => state.audio);
  const activeColor = isStorageLimitReached 
    ? 'red.500' 
    : isCreditsAlmostFinished 
      ? 'yellow.500' 
      : 'purple.500';

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

          if (isPrimaryNote) {
            dispatch(createPrimaryNoteTab());
          } else {
            navigate({ to: PRIMARY_NOTE_PATH });
          }
        },
        icon: <GoHome size="25" />,
        getMenu: activeSpace ? (
          { key, isActive, ...triggerProps }: { key: string; isActive: boolean } & IconButtonProps
        ) => {
          return (
            <HomeMenu key={key} {...triggerProps} />
          );
        } : undefined,
        _icon: { h: 'auto', w: 'auto' },
        isActive: pathname === PRIMARY_NOTE_PATH,
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
        isDisabled: activeSpace?.tabs.length === 0,
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
          borderColor={pathname === '/app/tabs' ? activeColor : borderColor}
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
      ...activeId && !isMobileWidgetOpen ? [{
        label: 'media',
        onClick: () => {
          dispatch(toggleMobileWidget());
        },
        icon: <SoundMenu audioId={activeId} />,
      }] : [],
      {
        label: 'menu',
        onClick: () => {
          navigate({ to: '/app/menu' });
        },
        icon: <RxHamburgerMenu 
          size="25"
        />,
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
    activeId,
    isMobileWidgetOpen,
    activeColor,
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
        {buttons.map(({ label, icon, onClick, getMenu, isActive, isDisabled, ...rest }) => {
          const props = {
            size: 'md' as const,
            'aria-label': label,
            children: icon,
            onClick: onClick,
            variant: 'plain' as const,
            display: 'inline-flex',
            colorScheme: 'brand',
            color: isActive ? activeColor : undefined,
            ...rest,
          };

          return getMenu 
            ? getMenu({ ...props, key: label, isActive }) 
            : (
              <IconButton
                key={label}
                disabled={isDisabled}
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