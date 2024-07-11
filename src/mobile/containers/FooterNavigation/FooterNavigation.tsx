import React from 'react';

import { Box, Center, IconButton, Text } from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { GoDotFill, GoSearch, GoPlus, GoHome } from 'react-icons/go';

import { drawerIds } from 'shared/constants/drawerIds';
import { routeNames } from 'shared/constants/routeNames';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectSortedSpaceTabs } from 'shared/store/slices/appSlice';
import { buildUrl } from 'shared/util/router/buildUrl';

import { DotNoteMenuDrawer } from 'mobile/containers/drawers/DotNoteMenuDrawer';
import { router } from 'mobile/routes/router';

type Props = {
  isDotMenuDisabled?: boolean,
  noteId?: string,
}

export const FooterNavigation = (props: Props) => {
  const { isDotMenuDisabled } = props;
  const dispatch = useAppDispatch();
  const tabIds = useAppSelector(selectSortedSpaceTabs);

  const buttons = React.useMemo(() => {
    return [
      {
        label: 'home',
        onClick: () => {
          // look src/desktop/modules/space/components/SpaceLayout/MainHeaderButton/MainHeaderButton.tsx 
          // dispatch(openMainSpaceNote());
          router.navigate(buildUrl({ routeName: routeNames.app }));
        },
        icon: <GoHome size="25" />,
      },
      {
        label: 'search',
        onClick: () => {
          router.navigate(buildUrl({ routeName: routeNames.search }));
        },
        icon: <GoSearch size="25" />,
      },
      {
        label: 'menu',
        onClick: () => {
          dispatch(showDrawer({ id: drawerIds.dotNoteMenu }));
        },
        icon: <GoDotFill size="35" />,
        isDisabled: isDotMenuDisabled,
      },
      {
        label: 'tabs',
        onClick: () => {
          router.navigate(buildUrl({ routeName: routeNames.tabs }));
        },
        icon: <Center
          w="6"
          h="6"
          rounded="6"
          border="1px"
          borderColor="gray.700"
        >
          {tabIds.length ? <Text fontSize="sm">{tabIds.length}</Text>: <GoPlus />}
        </Center>,
      },
      {
        label: 'account',
        onClick: () => {
          router.navigate(buildUrl({ routeName: routeNames.account }));
        },
        icon: <CiMenuBurger size="25" />,
      },
    ];
  }, [dispatch, tabIds, isDotMenuDisabled]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        px="2"
      >
        {buttons.map((button) => (
          <IconButton
            key={button.label}
            size="md"
            aria-label={button.label}
            icon={button.icon}
            onClick={button.onClick}
            variant="ghost"
            colorScheme="brand"
            isDisabled={button.isDisabled}
          />
        ))}
      </Box>
      <DotNoteMenuDrawer noteId="test" />
    </>
  );
};
