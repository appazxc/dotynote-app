import { Box, useTheme } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode,
}

export const SpaceLayout = (props: Props) => {
  const theme = useTheme();

  return (
    <Box
      w="full"
      h="full"
      maxW={theme.breakpoints.sm}
      minW="80"
      mx="auto"
    >
      {props.children}
    </Box>
  );
};
