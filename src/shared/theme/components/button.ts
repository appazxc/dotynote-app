// https://github.com/chakra-ui/chakra-ui/blob/HEAD/packages/components/theme/src/components/button.ts

import { defineStyle, defineStyleConfig, theme as defaultTheme, StyleFunctionProps } from '@chakra-ui/react';
import { omit } from 'lodash';

const brand = defineStyle({
  background: 'orange.500',
  color: 'white',
  fontFamily: 'serif',
  fontWeight: 'normal',

  // let's also provide dark mode alternatives
  _dark: {
    background: 'orange.300',
    color: 'orange.800',
  },
});

const ghost = defineStyle((props: StyleFunctionProps) => {
  const omitedProps = omit(defaultTheme.components.Button.variants?.ghost(props), '_hover');

  return ({
    ...omitedProps,
    '@media(hover: none)': {
      _hover: {
        bg: 'unset',
      },
    },
  });
});

export const Button = defineStyleConfig({
  variants: { 
    brand,
    ghost,
  },
});