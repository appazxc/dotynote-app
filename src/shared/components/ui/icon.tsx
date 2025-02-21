import { Box, Icon as ChakraIcon, IconProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
} & IconProps;

export const Icon = React.memo(({ children, ...restProps }: Props) => {
  return (
    <ChakraIcon
      {...restProps}
      w="fit-content"
      h="fit-content"
    >
      <Box>
        {children}
      </Box>
    </ChakraIcon>
  );
});
