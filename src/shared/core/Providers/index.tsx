import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { queryClient } from 'shared/api/queryClient';
import { Provider as ThemeProvider } from 'shared/components/ui/provider';
import { Device } from 'shared/core/Providers/Device';
import { SWProvider } from 'shared/core/Providers/SWProvider';
import { FileUploadProvider } from 'shared/modules/fileUpload';
import { AudioProvider } from 'shared/modules/noteAudio';
import { persistor, store } from 'shared/store';

type Props = React.PropsWithChildren<{}>

export const Providers = React.memo(({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AudioProvider>
              <Device>
                <FileUploadProvider>
                  <SWProvider>
                    {children}
                  </SWProvider>
                </FileUploadProvider>
              </Device>
            </AudioProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
});
