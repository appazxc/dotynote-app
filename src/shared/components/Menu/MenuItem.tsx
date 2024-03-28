import React from 'react';

import { Button } from '@chakra-ui/react';

import { MenuContext } from './MenuContext';

type Props = React.PropsWithChildren<{
  onClick?: () => void,
  isDisabled?: boolean,
}>

export const MenuItem = ({ onClick, isDisabled, children }: Props) => {
  const menu = React.useContext(MenuContext);

  return (
    <Button
      onClick={() => {
        onClick?.();
        menu.close();
      }}
      variant="ghost"
      textAlign="left"
      minW="120"
      justifyContent="start"
      isDisabled={isDisabled}
      fontWeight="normal"
    >
      {children}
    </Button>
  );
};
