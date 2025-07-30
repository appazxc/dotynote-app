import { Center } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';
import { logger } from 'shared/services/logger';

function DefaultErrorComponent({ reset, error }) {
  const router = useRouter();

  React.useEffect(() => {
    logger.error('Space tab error boundary triggered', error, {
      errorCategory: 'ui_error',
      severity: 'high',
      action: 'tab_error_boundary',
      module: 'desktop/space',
    });
  }, [error]);
  
  return (
    <Center
      w="full"
      h="full"
    >
      <EmptyState
        icon={<TbFaceIdError />}
        title="Error"
        description="Try to reload this tab"
      >
        <Button
          onClick={() => {
            reset();
            router.invalidate();
          }}
        >
          Reload
        </Button>
      </EmptyState>
    </Center>
  );
}

export { DefaultErrorComponent };
