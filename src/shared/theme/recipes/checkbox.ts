import { checkboxAnatomy } from '@ark-ui/react/checkbox';
import { defineSlotRecipe } from '@chakra-ui/react';

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  variants: {
    radius: {
      full: {
        control: {
          borderRadius: 'full',
        },
      },
    },
  },
});