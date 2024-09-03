import React from 'react';

import { ButtonProps } from '@chakra-ui/react';

import { MenuItemBase } from 'shared/components/Menu/MenuItemBase';

import { MenuContext } from './MenuContext';

type Props = {
  label: string,
  onClick?: () => void,
} & Omit<ButtonProps, 'children'>

export const MenuItem = ({ onClick, label, ...buttonProps }: Props) => {
  const menu = React.useContext(MenuContext);

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
