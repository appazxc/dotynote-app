import React from 'react';

import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { GoDotFill } from "react-icons/go";

import { openMainSpaceNote } from 'shared/actions/space/openMainSpaceNote';
import { useAppDispatch } from 'shared/store/hooks';

export const MainHeaderButton = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  
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
        colorScheme="brand"
        icon={<GoDotFill size="30" />}
        variant="outline"
        onClick={() => dispatch(openMainSpaceNote())}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      />
      <MenuList
        onAnimationEnd={() => {
          const menu = document.querySelector<HTMLDivElement>("[role=menu]");
          menu?.focus();
        }}
      >
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};
