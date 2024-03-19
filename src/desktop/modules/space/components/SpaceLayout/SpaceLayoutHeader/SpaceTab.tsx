import React from 'react';

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

import { closeOtherTabs } from 'shared/actions/space/closeOtherTabs';
import { closeRightTabs } from 'shared/actions/space/closeRightTabs';
import { closeTab } from 'shared/actions/space/closeTab';
import { ChakraBox } from 'shared/components/ChakraBox';
import { SpaceTabTitle } from 'shared/containers/SpaceTabTitle/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';

type Props = {
  id: IdentityType,
  isLast: boolean,
}

export const SpaceTab = React.memo(({ id, isLast }: Props) => {
  const dispatch = useAppDispatch();
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const activeTabId = useAppSelector(selectActiveTabId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleTabChange = React.useCallback(() => {
    if (!spaceTab) return;

    dispatch(updateActiveTabId(spaceTab.id));
  }, [dispatch, spaceTab]);

  if (!spaceTab) {
    return null;
  }

  const isActive = activeTabId === id;
  
  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      isLazy
    >
      <ChakraBox
        // as={ChakraBox}
        layout
        alignItems="stretch"
        maxWidth="32"
        minW={isActive ? '7': '3'}
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
        onClick={handleTabChange}
        onContextMenu={(e) => {
          e.preventDefault();
          onOpen();
        }}
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
        <MenuButton
          as={Box}
          left="0"
          w="full"
          h="full"
          position="absolute"
        />
        <ChakraBox
          layout
          position="relative"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="full"
        >
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
              onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                dispatch(closeTab(id));
              }}
            />
          </Box>
        </ChakraBox>
      </ChakraBox>
      <Portal>
        <MenuList
          onAnimationEnd={() => {
            const menu = document.querySelector<HTMLDivElement>('[role=menu]');
            menu?.focus();
          }}
        >
          <MenuItem
            onClick={() => {
            }}
          >
          Pin
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
      </Portal>
    </Menu>
  );
});
