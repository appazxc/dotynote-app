import React from 'react';

import { Button, ButtonProps } from 'shared/components/ui/button';

type Props = ButtonProps;

const MenuItemBaseComponent = ({ children, ...buttonProps }: Props, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      textAlign="left"
      minW="140px"
      size="xs"
      borderRadius="md"
      justifyContent="start"
      // pr={buttonProps.rightIcon ? '2' : '6'}
      fontWeight="400"
      flexGrow="1"
      gap="2"
      fontSize="sm"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export const MenuItemBase = React.memo(React.forwardRef(MenuItemBaseComponent));