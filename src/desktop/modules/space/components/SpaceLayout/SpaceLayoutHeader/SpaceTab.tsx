import React from 'react';

import { 
  Box,
  Button,
  MenuButton,
  MenuDivider,
  IconButton,
  Portal,
  Menu,
  MenuItem,
  MenuList,
  useDisclosure,
  ButtonProps,
  forwardRef,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

import { closeRightTabs } from 'shared/actions/space/closeRightTabs';
import { closeTab } from 'shared/actions/space/closeTab';
import { SpaceTabTitle } from 'shared/containers/SpaceTabTitle/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { closeOtherTabs } from 'shared/actions/space/closeOtherTabs';

type Props = {
  id: IdentityType,
  isLast: boolean,
}

const Tab = forwardRef<ButtonProps, 'div'>((props, ref) => (
  <Button
    as="div"
    ref={ref}
    {...props}
  />
));

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
      <MenuButton
        as={Tab}
        size="sm"
        variant={!isActive ? 'solid' : 'outline'}
        colorScheme={!isActive ? 'gray' : 'brand'}
        alignItems="center"
        maxWidth="32"
        minW={isActive ? '7': '3'}
        flexGrow="1"
        justifyContent="space-between"
        position="relative"
        px="1.5"
        iconSpacing="1"
        cursor="pointer"
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
        rightIcon={(
          <Box
            sx={isActive ? {} : {
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
        )}
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
          >
            <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
          </Box>
        </Box>
      </MenuButton>
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
