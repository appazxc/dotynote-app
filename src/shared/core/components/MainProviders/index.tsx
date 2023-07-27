import {
  ChakraProvider,
} from '@chakra-ui/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from 'shared/store';
import theme from 'shared/styles/theme';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'shared/api/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = React.PropsWithChildren<unknown>

function Providers ({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default React.memo<Props>(Providers);
