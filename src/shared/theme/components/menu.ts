// @ts-nocheck

import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

export const baseStyle = definePartsStyle({
  list: {
    // _dark: {
    //   '--menu-bg': 'colors.body',
    // },
    // _light: {
    //   '--menu-bg': 'colors.body',
    // },
    bg: 'body',
  },
});

export const Menu = defineMultiStyleConfig({ baseStyle });