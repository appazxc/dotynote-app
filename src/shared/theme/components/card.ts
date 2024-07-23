import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  elevated:  definePartsStyle({
    container: {
      _dark: {
        '--card-bg': 'colors.brand.400',
      },
    },
  }),
};

export const Card = defineMultiStyleConfig({ variants });