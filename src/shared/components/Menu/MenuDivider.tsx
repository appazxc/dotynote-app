import React from 'react';

import { Divider } from '@chakra-ui/react';

import { MenuListContext } from 'shared/components/Menu/MenuList';

export const MenuDivider = () => {
  const id = React.useId();
  const { activeItemId } = React.useContext(MenuListContext);

  if (activeItemId && activeItemId !== id) {
    return null;
  }

  return (
    <Divider my="0.5" />
  );
};
