import React from 'react';

import { Box, Center, IconButton, IconButtonProps, Text, useColorModeValue } from '@chakra-ui/react';
import { useLongPress } from '@uidotdev/usehooks';
import { CiMenuBurger } from 'react-icons/ci';
import { GoDotFill, GoHome, GoPlus, GoSearch } from 'react-icons/go';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { useBrowserLocation } from 'shared/components/BrowserLocationProvider';
import { useBrowserRouter } from 'shared/components/BrowserRouterProvider';
import { drawerIds } from 'shared/constants/drawerIds';
import { modalIds } from 'shared/constants/modalIds';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { showModal } from 'shared/modules/modal/modalSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { FooterNoteDialogs } from 'mobile/containers/FooterNavigation/FooterNoteDialogs';
import { HomeMenu } from 'mobile/containers/FooterNavigation/HomeMenu';
import { useDotMenuNoteId } from 'mobile/hooks/useDotMenuNoteId';

export const FooterNavigation = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeSpace = useAppSelector(selectActiveSpace);
  const { navigate } = useBrowserRouter();
  const { pathname } = useBrowserLocation();
  const borderColor = useColorModeValue('gray.600', 'gray.300');
  const noteId = useDotMenuNoteId();
  
  const tabsButtonProps = useLongPress(
    () => navigate({ to: '/app' }),
    { threshold: 500 }
  );

  const isDotMenuActive = pathname === '/app' || pathname === '/app/primary';

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
          
          navigate({ to: '/app/primary' });
        },
        icon: <GoHome size="25" />,
        getMenu: activeSpace ? ({ key, ...triggerProps }: { key: string } & IconButtonProps) => {
          return (
            <HomeMenu key={key} {...triggerProps} />
          );
        } : undefined,
      },
      {
        label: 'search',
        onClick: () => {
          navigate({ to: '/app/search' });
        },
        icon: <GoSearch size="25" />,
        isDisabled: false,
      },
      {
        label: 'menu',
        onClick: () => {
          dispatch(showDrawer({ id: drawerIds.dotNoteMenu }));
        },
        icon: <GoDotFill size="35" />,
        isDisabled: !noteId || !isDotMenuActive,
      },
      {
        label: 'tabs',
        onClick: () => {
          navigate({ to: '/app/tabs' });
        },
        icon: <Center
          w="6"
          h="6"
          rounded="6"
          border="2px"
          borderColor={borderColor}
        >
          {activeSpace?.tabs.length ? <Text fontSize="sm">{activeSpace.tabs.length}</Text> : <GoPlus />}
        </Center>,
        ...tabsButtonProps,
        onContextMenu: (event) => {
          event.preventDefault();
        },
      },
      {
        label: 'account',
        onClick: () => {
          navigate({ to: '/app/menu' });
          // router.navigate(buildUrl({ routeName: routeNames.account }));
        },
        icon: <CiMenuBurger size="25" />,
      },
    ];
  }, [
    dispatch,
    tabsButtonProps,
    borderColor,
    navigate,
    activeSpace,
    noteId,
    isDotMenuActive,
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
        {buttons.map(({ label, icon, onClick, isDisabled, getMenu, ...rest }) => {
          const props = {
            key: label,
            size: 'md',
            'aria-label': label,
            icon: icon,
            onClick: onClick,
            variant: 'unstyled',
            display: 'inline-flex',
            colorScheme: 'brand',
            isDisabled: isDisabled,
            ...rest,
          };

          return getMenu 
            ? getMenu(props) 
            : <IconButton {...props} key={props.key} />;
        })}
      </Box>
      <PrimaryNoteModal />
      {noteId && isDotMenuActive && (
        <FooterNoteDialogs noteId={noteId} />
      )}
    </>
  );
});
