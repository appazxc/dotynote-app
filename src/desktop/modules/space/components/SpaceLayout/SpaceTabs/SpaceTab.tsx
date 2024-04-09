import React from 'react';

import {
  Box,
  Circle,
  IconButton,
} from '@chakra-ui/react';
import { chakra, shouldForwardProp, useToken } from '@chakra-ui/react';
import { motion, Reorder, isValidMotionProp } from 'framer-motion';
import { MdClose } from 'react-icons/md';

import { closeOtherTabs } from 'shared/actions/space/closeOtherTabs';
import { closeRightTabs } from 'shared/actions/space/closeRightTabs';
import { closeTab } from 'shared/actions/space/closeTab';
import { useUpdateSpaceTab } from 'shared/api/hooks/useUpdateSpaceTab';
import { ChakraBox } from 'shared/components/ChakraBox';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { SpaceTabTitle } from 'shared/containers/SpaceTabTitle/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';

export const ReorderItemBox = chakra(Reorder.Item, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

type Props = {
  id: IdentityType,
  isLast: boolean,
}

export const SpaceTab = React.memo(({ id, isLast }: Props) => {
  const dispatch = useAppDispatch();
  const mousePosition = React.useRef({ x: null, y: null });
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
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
    mousePosition.current= { x: null, y: null };

    if (!spaceTab || mouseMoved) return;

    dispatch(updateActiveTabId(spaceTab.id));
  }, [dispatch, spaceTab]);

  if (!spaceTab) {
    return null;
  }

  const isActive = activeTabId === id;
  const { isPinned } = spaceTab;
  
  return (
    <Menu isContextMenu>
      <MenuTrigger
        as={ReorderItemBox}
        layout
        value={spaceTab}
        alignItems="stretch"
        maxWidth={isPinned ? '9' : '32'}
        minW={isActive || isPinned ? '7': '3'}
        flexGrow="1"
        justifyContent="space-between"
        position="relative"
        px="1.5"
        cursor="pointer"
        backgroundColor={isActive ? 'white' : 'gray.100'}
        borderRadius="6"
        borderColor={isActive ? 'gray.900' : 'gray.100'}
        borderWidth="1px"
        borderStyle="solid"
        display="flex"
        onMouseDown={handleMouseDown}
        onClick={handleTabChange}
        sx={{
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
      >
        <ChakraBox
          position="relative"
          display="flex"
          justifyContent={isPinned ? 'center' : 'space-between'}
          alignItems="center"
          w="full"
        >
          {isPinned ? (
            <Circle
              as={motion.div}
              layout
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
                sx={isActive ? {
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
                  <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexShrink="0"
                position="relative"
                ml="1"
                sx={isActive ? {
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
                  icon={<MdClose size="13px" />}
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
                />
              </Box>
            </>
          )}
        </ChakraBox>
      </MenuTrigger>
      <MenuList>
        <MenuItem
          onClick={() => {
            mutate({ isPinned: !isPinned });
          }}
        >
          {isPinned ? 'Unpin': 'Pin'}
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            dispatch(closeTab(id));
          }}
        >
            Close
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(closeOtherTabs(id));
          }}
        >
            Close other tabs
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(closeRightTabs(id));
          }}
          isDisabled={isLast}
        >
            Close to the Right
        </MenuItem>
      </MenuList>
    </Menu>
  );
});
