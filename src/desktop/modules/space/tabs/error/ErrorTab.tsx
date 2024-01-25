
import { Box, Center } from '@chakra-ui/react';
import { useRouteError } from 'react-router';

export const ErrorTab = () => {
  const error: any = useRouteError();

  return (
    <Box
      w="full"
      h="full"
    >
      <Center h="full">
        {error?.message || 'Unknown error'}
      </Center>
    </Box>
  );
};
