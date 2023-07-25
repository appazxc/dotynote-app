import { Box, BoxProps, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  position?: BoxProps['position'],
}

export const LayoutHeader = ({ position }: Props) => {
  const rootProps: BoxProps = position === 'absolute'
    ? {
      position: 'absolute',
      width: 'full',
      top: '0',
      left: '0',
    }
    : { position: 'sticky' };

  return (
    <Box
      {...rootProps}
      py="3"
      pl="4"
      background="white"
    >
      <Link to="/"><Text fontWeight="bold" display="inline">[.dotynote]</Text></Link>
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
