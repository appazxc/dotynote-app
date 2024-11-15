import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  variants: {
    iconSize: {
      auto: { 
        _icon: {
          w: 'auto',
          h: 'auto',
        } },
    },
  },
});