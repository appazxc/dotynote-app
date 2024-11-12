'use client';

import { ChakraProvider } from '@chakra-ui/react';

import theme from 'shared/theme';

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from './color-mode';

export function Provider(props: ColorModeProviderProps) {
  console.log('theme', theme);
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
