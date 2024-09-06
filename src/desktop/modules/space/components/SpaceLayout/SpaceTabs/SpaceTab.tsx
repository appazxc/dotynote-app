import React from 'react';

import {
  Box,
  chakra,
  Circle,
  IconButton,
  shouldForwardProp,
  useColorModeValue,
} from '@chakra-ui/react';
import { isValidMotionProp, motion, Reorder } from 'framer-motion';
import { MdClose } from 'react-icons/md';

import { closeOtherTabs } from 'shared/actions/space/closeOtherTabs';
import { closeRightTabs } from 'shared/actions/space/closeRightTabs';
import { closeTab } from 'shared/actions/space/closeTab';
import { useUpdateSpaceTab } from 'shared/api/hooks/useUpdateSpaceTab';
import { ChakraBox } from 'shared/components/ChakraBox';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useTabTitle } from 'shared/hooks/useTabTitle';
import { SpaceTabTitle } from 'shared/modules/space/components/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateActiveTabId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { router } from 'desktop/modules/space/tabRoutes/router';

export const ReorderItemBox = chakra(Reorder.Item, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

type Props = {
  id: string,
  isLast: boolean,
}

export const SpaceTab = React.memo(({ id, isLast }: Props) => {
  const dispatch = useAppDispatch();
  const mousePosition = React.useRef({ x: null, y: null });
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));

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
  const borderColor = useColorModeValue(isActive ? 'gray.900' : 'gray.100', isActive ? 'white' : 'brand.400');
  
  return (
    <Menu isContextMenu>
      <MenuTrigger
        layout
        as={ReorderItemBox}
        value={spaceTab}
        alignItems="stretch"
        maxWidth={isPinned ? '9' : '32'}
        minW={isActive || isPinned ? '7' : '3'}
        h="30"
        flexGrow="1"
        justifyContent="space-between"
        position="relative"
        px="1.5"
        cursor="pointer"
        borderRadius="6"
        bg={bg}
        borderColor={borderColor}
        borderWidth="1px"
        borderStyle="solid"
        display="flex"
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
        onMouseDown={handleMouseDown}
        onClick={handleTabChange}
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
              layout
              as={motion.div}
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
                  <SpaceTabTitle title={title} />
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
          isDisabled={isLast}
          label="Close to the Right"
          onClick={() => {
            dispatch(closeRightTabs(id));
          }}
        />
      </MenuList>
    </Menu>
  );
});
