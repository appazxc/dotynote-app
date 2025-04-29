import { dialogAnatomy as arkDialogAnatomy } from '@ark-ui/react/dialog';
import { defineSlotRecipe } from '@chakra-ui/react';

export const dialogAnatomy = arkDialogAnatomy.extendWith(
  'header',
  'body',
  'footer',
  'backdrop'
);

export const dialogSlotRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    content: {
      borderRadius: '2xl',
    },
  },
  variants: {
    size: {
      full: {
        content: {
          minH: '100dvh',
        },
      },
      '2xs': {
        content: {
          maxW: 'xs',
        },
      },
    },
  },
});