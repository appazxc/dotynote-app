import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

import { MenuContext } from './MenuContext';

type Props = React.PropsWithChildren<{
  onClick?: () => void,
  isDisabled?: boolean,
} & ButtonProps>

export const MenuItem = ({ onClick, isDisabled, children, ...buttonProps }: Props) => {
  const menu = React.useContext(MenuContext);

  return (
    <Button
      variant="ghost"
      textAlign="left"
      minW="120"
      size="sm"
      borderRadius="md"
      justifyContent="start"
      isDisabled={isDisabled}
      fontWeight="medium"
      onClick={() => {
        onClick?.();
        menu.close();
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
