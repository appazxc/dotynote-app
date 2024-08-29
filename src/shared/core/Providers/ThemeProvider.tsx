import React from 'react';

import { ChakraProvider, UseToastOptions } from '@chakra-ui/react';

import { toastOptions } from 'shared/constants/toastOptions';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';
import theme from 'shared/theme';

type Props = React.PropsWithChildren<{}>

export const ThemeProvider = React.memo(({ children }: Props) => {
  const isMobile = useAppSelector(selectIsMobile);

  const defaultOptions: UseToastOptions = {
    ...toastOptions,
    position: isMobile ? 'bottom' : 'bottom-right',
  };

  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions }}>
      {children}
    </ChakraProvider>
  );
});
