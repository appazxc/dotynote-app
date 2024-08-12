import React from 'react';

import { Box, Center, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { useLongPress } from '@uidotdev/usehooks';
import { CiMenuBurger } from 'react-icons/ci';
import { GoDotFill, GoHome, GoPlus, GoSearch } from 'react-icons/go';

import { useBrowserRouter } from 'shared/components/BrowserRouterProvider';
import { drawerIds } from 'shared/constants/drawerIds';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { FooterNoteDialogs } from 'mobile/containers/FooterNavigation/FooterNoteDialogs';

type Props = {
  noteId?: number,
}

export const FooterNavigation = React.memo((props: Props) => {
  const { noteId } = props;
  const dispatch = useAppDispatch();
  const activeSpace = useAppSelector(selectActiveSpace);
  const { navigate } = useBrowserRouter();
  const borderColor = useColorModeValue('gray.600', 'gray.300');

  const tabsButtonProps = useLongPress(
    () => {
      navigate({ to: '/app' });
    },
    {
      threshold: 500,
    }
  );
  
  invariant(activeSpace, 'Missing active space');

  const buttons = React.useMemo(() => {
    return [
      {
        label: 'home',
        onClick: () => {
          // look src/desktop/modules/space/components/SpaceLayout/MainHeaderButton/MainHeaderButton.tsx 
          // dispatch(openMainSpaceNote());
          navigate({ to: '/app' });
        },
        icon: <GoHome size="25" />,
      },
      {
        label: 'search',
        onClick: () => {
          // router.navigate(buildUrl({ routeName: routeNames.search }));
        },
        icon: <GoSearch size="25" />,
        isDisabled: true,
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
          navigate({ to: '/app/tabs' });
        },
        icon: <Center
          w="6"
          h="6"
          rounded="6"
          border="2px"
          borderColor={borderColor}
        >
          {activeSpace.tabs.length ? <Text fontSize="sm">{activeSpace.tabs.length}</Text> : <GoPlus />}
        </Center>,
        ...tabsButtonProps,
        onContextMenu: (event) => {
          event.preventDefault();
        },
      },
      {
        label: 'account',
        onClick: () => {
          // router.navigate(buildUrl({ routeName: routeNames.account }));
        },
        icon: <CiMenuBurger size="25" />,
      },
    ];
  }, [dispatch, tabsButtonProps, borderColor, navigate, activeSpace.tabs.length, noteId]);

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
        {buttons.map(({ label, icon, onClick, isDisabled, ...rest }) => (
          <IconButton
            key={label}
            size="md"
            aria-label={label}
            icon={icon}
            onClick={onClick}
            variant="unstyled"
            display="inline-flex"
            colorScheme="brand"
            isDisabled={isDisabled}
            {...rest}
          />
        ))}
      </Box>
      {noteId && (
        <FooterNoteDialogs noteId={noteId} />
      )}
    </>
  );
});
