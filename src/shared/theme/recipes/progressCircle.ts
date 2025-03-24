import { progressAnatomy } from '@ark-ui/react/progress';
import { defineSlotRecipe } from '@chakra-ui/react';

export const progressCircleSlotRecipe = defineSlotRecipe({
  slots: progressAnatomy.keys(),
  variants: {
    size: {
      '2sm': {
        circle: {
          '--size': '36px',
          '--thickness': '2px',
        },
      },
      'md': {
        circle: {
          '--thickness': '2px',
        },
      },
    },
  },
});