import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const WithMenu = React.memo((props: Props) => {
  const { children } = props;

  return (
    <Box>
      {children}
    </Box>
  );
});
