import React from 'react';

import { Button, Text, ButtonProps } from '@chakra-ui/react';

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
      pr={buttonProps.rightIcon ? '2' : '6'}
      {...buttonProps}
    >
      <Text fontWeight="medium" flexGrow="1">
        {children}
      </Text>
    </Button>
  );
};

export const MenuItemBase = React.memo(React.forwardRef(MenuItemBaseComponent));