// @ts-nocheck

import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    _dark: {
      bg:'brand.700',
    },
  },
});

export const Modal = defineMultiStyleConfig({
  baseStyle,
});