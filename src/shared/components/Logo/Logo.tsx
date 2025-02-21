import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

type Props = BoxProps;

export const Logo = (props: Props) => {
  return (
    <Box {...props}>
      <Text fontWeight="bold" display="inline">[.dotynote]</Text>
      <Text
        fontSize="xs"
        display="inline"
        as="sub"
        ml="0.5"
      >
          preAlpha
      </Text>
    </Box>
  );
};
