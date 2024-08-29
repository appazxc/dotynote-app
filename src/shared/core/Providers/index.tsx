import * as React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { queryClient } from 'shared/api/queryClient';
import config from 'shared/config';
import { Device } from 'shared/core/Providers/Device';
import { ThemeProvider } from 'shared/core/Providers/ThemeProvider';
import { persistor, store } from 'shared/store';

type Props = React.PropsWithChildren<{}>

export const Providers = React.memo(({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Device>{children}</Device>
          </ThemeProvider>
          {config.devtools.query && <ReactQueryDevtools initialIsOpen />}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
});
