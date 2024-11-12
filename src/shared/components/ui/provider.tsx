'use client';

import { ChakraProvider } from '@chakra-ui/react';

import appTheme from 'shared/theme';

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from './color-mode';

console.log('appTheme', appTheme);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={appTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
