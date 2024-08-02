import * as React from 'react';

import {
  ChakraProvider,
} from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { queryClient } from 'shared/api/queryClient';
import config from 'shared/config';
import { toastOptions } from 'shared/constants/toastOptions';
import { store, persistor } from 'shared/store';
import theme from 'shared/theme';

import { Device } from './Device';

type Props = React.PropsWithChildren<unknown>

function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme} toastOptions={{ defaultOptions: toastOptions }}>
            <Device>{children}</Device>
          </ChakraProvider>
          {config.devtools.query && <ReactQueryDevtools initialIsOpen />}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default React.memo<Props>(Providers);
