import React from 'react';

import { ButtonProps } from '@chakra-ui/react';

import { MenuItemBase } from 'shared/components/Menu/MenuItemBase';
import { MenuListContext } from 'shared/components/Menu/MenuList';

import { MenuContext } from './MenuContext';

type Props = {
  label: string,
  onClick?: () => void,
} & Omit<ButtonProps, 'children'>

export const MenuItem = ({ onClick, label, ...buttonProps }: Props) => {
  const menu = React.useContext(MenuContext);
  const { activeItemId } = React.useContext(MenuListContext);
  const id = React.useId();
  
  if (activeItemId && activeItemId !== id) {
    return null;
  }

  return (
    <MenuItemBase
      onClick={() => {
        onClick?.();
        menu.close();
      }}
      {...buttonProps}
    >
      {label}
    </MenuItemBase>
  );
};
