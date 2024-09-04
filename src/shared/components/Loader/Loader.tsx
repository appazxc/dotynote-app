import React from 'react';

import { Box, Button, Center, Spinner } from '@chakra-ui/react';

import { logout } from 'shared/actions/auth';
import { queryClient } from 'shared/api/queryClient';
import { Wait } from 'shared/components/Wait';
import { min } from 'shared/constants/time';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  delay?: number,
  text?: string
}

export const Loader = React.memo(({ delay = 300, text }: Props) => {
  const [canReload, setCanReload] = React.useState(false);
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCanReload(true);
    }, 5 * min);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Wait delay={delay}>
      <Center
        w="full"
        h="full"
        position="relative"
      >
        <Spinner />
        {text}
        {canReload && (
          <Box
            position="absolute"
            bottom="0"
            left="0"
            p="4"
          >
            <Button
              variant="ghost"
              onClick={() => {
                dispatch(logout());
                window.location.reload();
              }}
            >
              Reset all data
            </Button>
          </Box>
        )}
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