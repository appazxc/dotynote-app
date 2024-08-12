// https://github.com/chakra-ui/chakra-ui/blob/HEAD/packages/components/theme/src/components/button.ts

import { defineStyle, defineStyleConfig, theme as defaultTheme, StyleFunctionProps } from '@chakra-ui/react';
import { omit } from 'lodash';

const brandPrimary = defineStyle({
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

export const Button = defineStyleConfig({
  variants: { 
    brand: brandPrimary,
    solid: (props: StyleFunctionProps) => {
      const omitedProps = omit(defaultTheme.components.Button.variants?.solid(props), '_hover');

      console.log('omitedProps', omitedProps);

      return ({
        ...omitedProps,
        _hover: {
          bg: undefined,
        },
        '@media(hover: hover) and (pointer: fine)': {
          _hover: {
            bg: 'blue',//defaultTheme.components.Button.variants?.solid(props).bg,
          },
        },
      });
    },
    ghost: (props: StyleFunctionProps) => {
      const omitedProps = omit(defaultTheme.components.Button.variants?.ghost(props), '_hover');

      return ({
        ...omitedProps,
        _hover: {
          bg: undefined,
        },
        '@media(hover: hover) and (pointer: fine)': {
          _hover: {
            bg: 'yellow',//defaultTheme.components.Button.variants?.ghost(props).bg,
          },
        },
      });
    },
  },
});