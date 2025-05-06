import {
  Box,
  Circle,
  IconButton,
} from '@chakra-ui/react';
import { Reorder } from 'motion/react';
import React from 'react';
import { MdClose } from 'react-icons/md';

import { closeOtherTabs } from 'shared/actions/space/closeOtherTabs';
import { closeRightTabs } from 'shared/actions/space/closeRightTabs';
import { closeTab } from 'shared/actions/space/closeTab';
import { updateActiveTabId } from 'shared/actions/space/updateActiveTabId';
import { useUpdateSpaceTab } from 'shared/api/hooks/useUpdateSpaceTab';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { useTabTitle } from 'shared/hooks/useTabTitle';
import { SpaceTabTitle } from 'shared/modules/space/components/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { router } from 'desktop/modules/space/tabRoutes/router';

type Props = {
  id: string;
  isLast: boolean;
}

export const SpaceTab = React.memo(({ id, isLast }: Props) => {
  const dispatch = useAppDispatch();
  const mousePosition = React.useRef({ x: null, y: null });
  const getById = React.useMemo(() => spaceTabSelector.makeGetEntityById(), []);
  const spaceTab = useAppSelector(state => getById(state, id));

  invariant(spaceTab, 'Missing space tab');

  const title = useTabTitle(spaceTab.routes[spaceTab.routes.length - 1], router);
  const activeTabId = useAppSelector(selectActiveTabId);
  
  const { mutate } = useUpdateSpaceTab(id);

  const handleMouseDown = React.useCallback((event) => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handleTabChange = React.useCallback((event) => {
    if (!mousePosition.current.x || !mousePosition.current.y) {
      return;
    }
    
    const mouseMoved = Math.abs(mousePosition.current.x - event.clientX) > 3 
      || Math.abs(mousePosition.current.y - event.clientY) > 3;
    mousePosition.current = { x: null, y: null };

    if (!spaceTab || mouseMoved) return;

    dispatch(updateActiveTabId(spaceTab.id));
  }, [dispatch, spaceTab]);
  
  const isActive = activeTabId === id;
  const { isPinned } = spaceTab;
  const bg = useColorModeValue(isActive ? 'white' : 'gray.100', isActive ? 'brand.500' : 'brand.400');
  const borderColor = useColorModeValue(isActive ? 'gray.300' : 'gray.100', isActive ? 'white' : 'brand.400');
  
  return (
    <Menu isContextMenu>
      <MenuTrigger>
        <Box 
          asChild
          alignItems="stretch"
          w={isPinned ? '28px' : undefined}
          maxWidth="160px"
          minW={isActive || isPinned ? '28px' : '12px'}
          h="30px"
          flexGrow="1"
          justifyContent="space-between"
          position="relative"
          px="1.5"
          cursor="pointer"
          borderRadius="sm"
          bg={bg}
          borderColor={borderColor}
          borderWidth="1px"
          borderStyle="solid"
          display="flex"
          css={{
            containerType: 'size',
            ...isActive ? {
              '@container (max-width: 30px)': {
                '& > .chakra-button__icon': { 
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginInlineStart: 0, 
                },
              },
            } : {},
          }} 
          onMouseDown={handleMouseDown}
          onClick={handleTabChange}
        >
          <Reorder.Item value={id}>
            <Box
              position="relative"
              display="flex"
              justifyContent={isPinned ? 'center' : 'space-between'}
              alignItems="center"
              w="full"
            >
              {isPinned ? (
                <Circle
                  size="18px"
                  bg="purple.100"
                />
              ) : (
                <>
                  <Box
                    position="relative"
                    display="flex"
                    flexGrow="1"
                    h="full"
                    css={isActive ? {
                      '@container (max-width: 25px)': {
                        '&': { display: 'none' },
                      },
                    } : {}}
                  >
                    <Box
                      position="absolute"
                      h="full"
                      w="full"
                      display="flex"
                      alignItems="center"
                      overflow="hidden"
                    >
                      <SpaceTabTitle title={title} />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexShrink="0"
                    position="relative"
                    ml="1"
                    css={isActive ? {
                      '@container (max-width: 30px)': {
                        '&': { justifyContent: 'center', width: '100%', marginLeft: 0 },
                      },
                    } : {
                      '@container (max-width: 30px)': {
                        '&': { display: 'none' },
                      },
                    }}
                  >
                    <IconButton
                      h="5"
                      w="5"
                      minW="5"
                      aria-label="close"
                      variant="ghost"
                      colorScheme="gray"
                      iconSize="auto"
                      borderRadius="50%"
                      onContextMenu={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                      }}
                      onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        event.stopPropagation();
                        dispatch(closeTab(id));
                      }}
                    ><MdClose size="13px" /></IconButton>
                  </Box>
                </>
              )}
            </Box>
          </Reorder.Item>
        </Box>
      </MenuTrigger>
      <MenuList>
        <MenuItem
          label={isPinned ? 'Unpin' : 'Pin'}
          onClick={() => {
            mutate({ isPinned: !isPinned });
          }}
        />
        <MenuDivider />
        <MenuItem
          label="Close"
          onClick={() => {
            dispatch(closeTab(id));
          }}
        />
        <MenuItem
          label="Close other tabs"
          onClick={() => {
            dispatch(closeOtherTabs(id));
          }}
        />
        <MenuItem
          disabled={isLast}
          label="Close to the Right"
          onClick={() => {
            dispatch(closeRightTabs(id));
          }}
        />
      </MenuList>
    </Menu>
  );
});
