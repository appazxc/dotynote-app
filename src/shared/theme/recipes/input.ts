import { defineRecipe } from '@chakra-ui/react';

export const inputRecipe = defineRecipe({
  base: {
    '--focus-color': 'colors.border.inverted',
  },
});