import React from 'react';

import { Button, ButtonProps } from 'shared/components/ui/button';

type Props = ButtonProps;

const MenuItemBaseComponent = ({ children, ...buttonProps }: Props, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      textAlign="left"
      minW="140"
      size="sm"
      borderRadius="md"
      justifyContent="space-between"
      // pr={buttonProps.rightIcon ? '2' : '6'}
      fontWeight="medium"
      flexGrow="1"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export const MenuItemBase = React.memo(React.forwardRef(MenuItemBaseComponent));