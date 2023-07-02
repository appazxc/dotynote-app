import {
  ChakraProvider,
} from '@chakra-ui/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from 'shared/store';
import theme from 'shared/styles/theme';
import { PersistGate } from 'redux-persist/integration/react';

type Props = React.PropsWithChildren<unknown>

function Providers ({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default React.memo<Props>(Providers);
