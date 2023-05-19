import * as React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';

type Props = React.PropsWithChildren<unknown>

function Providers ({ children }: Props) {
  return (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  );
}

export default React.memo<Props>(Providers);
