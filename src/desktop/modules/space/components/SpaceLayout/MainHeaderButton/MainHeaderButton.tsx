import React from 'react';

import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToken } from '@chakra-ui/react';
import { GoDotFill } from 'react-icons/go';

import { openMainSpaceNote } from 'shared/actions/space/openMainSpaceNote';
import { routeNames } from 'shared/constants/routeNames';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpace } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';
import { buildUrl } from 'shared/util/router/buildUrl';

import router from 'desktop/routes/router';

export const MainHeaderButton = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const space = useAppSelector(selectActiveSpace);
  const brand = useToken(
    'colors',
    'brand.700'
  );
  invariant(space, 'Missing space');
  
  return (
    <Menu
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      placement="bottom-start"
      flip={false}
    >
      <MenuButton
        as={IconButton}
        position="relative"
        size="sm"
        aria-label="Side note menu"
        colorScheme={space.mainNoteId ? 'brand' : 'gray'}
        icon={<GoDotFill size="30" color={space.mainNoteId ? brand : 'gray'} />}
        variant="outline"
        isActive={false}
        onClick={() => dispatch(openMainSpaceNote())}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      />
      <MenuList
        onAnimationEnd={() => {
          const menu = document.querySelector<HTMLDivElement>('[role=menu]');
          menu?.focus();
        }}
      >
        <MenuItem
          onClick={() => {
            router.navigate(buildUrl({
              routeName: routeNames.spaces,
            }));
          }}
        >
          Spaces
        </MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};
