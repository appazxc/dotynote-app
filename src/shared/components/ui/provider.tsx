'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';
import appTheme from 'shared/theme';
console.log('appTheme', appTheme);
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from './color-mode';

export function Provider(props: ColorModeProviderProps) {
  const isMobile = useAppSelector(selectIsMobile);

  // const defaultOptions: UseToastOptions = {
  //   ...toastOptions,
  //   position: isMobile ? 'bottom' : 'bottom-right',
  // };

  return (
    <ChakraProvider value={appTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
