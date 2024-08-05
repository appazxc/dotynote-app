import React from 'react';

import { Box, Center, IconButton, Text } from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { GoDotFill, GoHome, GoPlus, GoSearch } from 'react-icons/go';

import { drawerIds } from 'shared/constants/drawerIds';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { selectSortedTabIds } from 'shared/selectors/tab/selectSortedTabIds';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { DotNoteMenuDrawer } from 'mobile/containers/drawers/DotNoteMenuDrawer';
import { router } from 'mobile/routes/router';

type Props = {
  noteId?: number,
}

export const FooterNavigation = (props: Props) => {
  const { noteId } = props;
  const dispatch = useAppDispatch();
  const tabIds = useAppSelector(selectSortedTabIds);
  
  const buttons = React.useMemo(() => {
    return [
      {
        label: 'home',
        onClick: () => {
          // look src/desktop/modules/space/components/SpaceLayout/MainHeaderButton/MainHeaderButton.tsx 
          // dispatch(openMainSpaceNote());
          router.navigate({ to: '/app' });
        },
        icon: <GoHome size="25" />,
      },
      {
        label: 'search',
        onClick: () => {
          // router.navigate(buildUrl({ routeName: routeNames.search }));
        },
        icon: <GoSearch size="25" />,
      },
      {
        label: 'menu',
        onClick: () => {
          dispatch(showDrawer({ id: drawerIds.dotNoteMenu }));
        },
        icon: <GoDotFill size="35" />,
        isDisabled: !noteId,
      },
      {
        label: 'tabs',
        onClick: () => {
          router.navigate({ to: '/app/tabs' });
        },
        icon: <Center
          w="6"
          h="6"
          rounded="6"
          border="1px"
          borderColor="gray.700"
        >
          {tabIds.length ? <Text fontSize="sm">{tabIds.length}</Text> : <GoPlus />}
        </Center>,
      },
      {
        label: 'account',
        onClick: () => {
          // router.navigate(buildUrl({ routeName: routeNames.account }));
        },
        icon: <CiMenuBurger size="25" />,
      },
    ];
  }, [dispatch, tabIds, noteId]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        h="10"
        px="4"
      >
        {buttons.map((button) => (
          <IconButton
            key={button.label}
            size="md"
            aria-label={button.label}
            icon={button.icon}
            onClick={button.onClick}
            variant="unstyled"
            display="inline-flex"
            colorScheme="brand"
            isDisabled={button.isDisabled}
          />
        ))}
      </Box>
      <DotNoteMenuDrawer noteId="test" />
    </>
  );
};
