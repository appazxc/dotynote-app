import React from 'react';

import { Button, ButtonProps } from 'shared/components/ui/button';

type Props = ButtonProps;

const MenuItemBaseComponent = ({ children, ...buttonProps }: Props, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      textAlign="left"
      minW="160"
      size="xs"
      borderRadius="md"
      justifyContent="start"
      // pr={buttonProps.rightIcon ? '2' : '6'}
      fontWeight="medium"
      flexGrow="1"
      gap="2"
      {...buttonProps}
      fontSize="sm"
    >
      {children}
    </Button>
  );
};

export const MenuItemBase = React.memo(React.forwardRef(MenuItemBaseComponent));