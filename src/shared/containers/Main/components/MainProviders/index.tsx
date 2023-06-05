import {
  ChakraProvider
} from '@chakra-ui/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from 'shared/state/store';
import theme from 'shared/styles/theme';

type Props = React.PropsWithChildren<unknown>

function Providers ({ children }: Props) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </Provider>
  );
}

export default React.memo<Props>(Providers);
