// https://github.com/chakra-ui/chakra-ui/blob/HEAD/packages/components/theme/src/components/button.ts

import { defineStyle, defineStyleConfig, theme as defaultTheme, StyleFunctionProps } from '@chakra-ui/react';
import { omit } from 'lodash';

const getIconButtonProps = (props: StyleFunctionProps) => {
  const isIconButton = 'aria-label' in props;

  if (!isIconButton) {
    return {};
  }

  return {
    borderRadius: defaultTheme.components.Button.baseStyle?.borderRadius,
  };
};

const primary = defineStyle((props: StyleFunctionProps) => {
  const btnProps = defaultTheme.components.Button.variants?.solid(props);

  return ({
    ...btnProps,
  });
});

const ghost = defineStyle((props: StyleFunctionProps) => {
  const omitedProps = omit(defaultTheme.components.Button.variants?.ghost(props), '_hover');

  return ({
    ...omitedProps,
    ...getIconButtonProps(props),
    '@media(hover: none)': {
      _hover: {
        bg: 'unset',
      },
    },
  });
});

const outline = defineStyle((props: StyleFunctionProps) => {
  return getIconButtonProps(props);
});

const solid = defineStyle((props: StyleFunctionProps) => {
  return getIconButtonProps(props);
});

export const Button = defineStyleConfig({
  sizes: {
    md: {
      h: '44px',
    },
  },
  baseStyle: {
    borderRadius: '2xl',
  },
  defaultProps: {
    variant: 'primary',
  },
  variants: { 
    primary,
    ghost,
    outline,
    solid,
  },
});