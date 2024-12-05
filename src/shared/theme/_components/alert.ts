// @ts-nocheck
import { alertAnatomy } from '@chakra-ui/anatomy';
import { AlertProps, createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props: AlertProps) => {
  const { status } = props;

  const infoBase = status === 'info' && {
    container: {
      background: 'brand.500',
      color: 'white',
      _dark: {
        background: 'white',
        color: 'brand.500',
      },
    },
  };

  return {
    ...infoBase,
  };
});

export const Alert = defineMultiStyleConfig({ baseStyle });