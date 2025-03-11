'use client';
import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react';
import React from 'react';

import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  max: 3,
});

export const Toaster = () => {
  const isMobile = useAppSelector(selectIsMobile);

  React.useEffect(() => {
    toaster.machine.setContext({ placement: isMobile ? 'bottom' : 'bottom-end' });
  }, [isMobile]);

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ sm: 'xs' }}>
            {toast.type === 'loading' ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack
              gap="1"
              flex="1"
              maxWidth="100%"
            >
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
