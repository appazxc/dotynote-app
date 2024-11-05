import React from 'react';

import { ButtonProps } from '@chakra-ui/react';

import { MenuItemBase } from 'shared/components/Menu/MenuItemBase';
import { MenuListContext } from 'shared/components/Menu/MenuList';

import { MenuContext } from './MenuContext';

type Props = {
  label: string,
  onClick?: () => void,
  closeOnClick?: boolean,
} & Omit<ButtonProps, 'children'>

export const MenuItem = (props: Props) => {
  const { onClick, label, closeOnClick = true, ...buttonProps } = props;
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
        if (closeOnClick) {
          menu.close();
        }
      }}
      {...buttonProps}
    >
      {label}
    </MenuItemBase>
  );
};
