import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  variants: {
    size: {
      '3xs': {
        h: '5',
        minW: '5',
        textStyle: 'xs',
        px: '2',
        gap: '1',
        _icon: {
          width: '3',
          height: '3',
        },
      },
    },
    iconSize: {
      auto: { 
        _icon: {
          w: 'auto',
          h: 'auto',
        }, 
      },
    },
  },
});