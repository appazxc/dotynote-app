import React from 'react';

import { Box, Button, Center } from '@chakra-ui/react';
import { useRevalidator, useRouteError } from 'react-router';

import { InvariantError } from 'shared/util/invariant';

export const ErrorTab = () => {
  const error: any = useRouteError();
  const isInvariant = error instanceof InvariantError;
  const revalidator = useRevalidator();

  const reloadButton = React.useMemo(() => {
    return <Button onClick={() => revalidator.revalidate()} size="sm">Reload</Button>;
  }, [revalidator]);
  
  const fullMessage = React.useMemo(() => {
    return (
      <Box>
        <Box>
          {error?.message || 'Unknown error'}
        </Box>
        <Box>
          {error.stack}
        </Box>
        <Box
          justifyContent="center"
          display="flex"
          mt="4"
        >
          {reloadButton}
        </Box>
      </Box>
    );
  }, [error, reloadButton]);

  const smallMessage = React.useMemo(() => {
    return (
      <Box>
        <Box>
          An error occurred
        </Box>
        <Box
          justifyContent="center"
          display="flex"
          mt="4"
        >
          {reloadButton}
        </Box>
      </Box>
    );
  }, [reloadButton]);

  return (
    <Box
      w="full"
      h="full"
    >
      <Center h="full" px="10">
        {isInvariant ? smallMessage : fullMessage}
      </Center>
    </Box>
  );
};
