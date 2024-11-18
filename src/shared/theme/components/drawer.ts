// @ts-nocheck

import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: 'blackAlpha.200', //change the background
  },
  dialog: {
    bg: 'body',
  },
});

export const Drawer = defineMultiStyleConfig({
  baseStyle,
});