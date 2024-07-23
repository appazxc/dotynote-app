import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  // define the part you're going to style
  body: {
    borderRadius: 'md',
    _dark: {
      bg: 'brand.700',
    },
  },
  content: {
    _dark: {
      bg: 'brand.700',
    },
  },
});
export const Popover = defineMultiStyleConfig({ baseStyle });