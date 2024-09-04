import React from 'react';

import { Box, Center, Spinner } from '@chakra-ui/react';

import { queryClient } from 'shared/api/queryClient';
import { Wait } from 'shared/components/Wait';

type Props = {
  delay?: number,
  text?: string
}

export const Loader = React.memo(({ delay = 300, text }: Props) => {
  return (
    <Wait delay={delay}>
      <Center
        w="full"
        h="full"
        position="relative"
      >
        <Spinner />
        {text}
        <Box
          position="absolute"
          bottom="0"
          right="0"
          p="4"
        >
          {queryClient.getQueriesData({ type: 'active' }).map(([queryKey], index) => {
            const [route] = queryKey;

            return (
              <div key={index}>
                Loading... {route as string}
              </div>
            );
          })}
        </Box>
      </Center>
    </Wait>
  );
});