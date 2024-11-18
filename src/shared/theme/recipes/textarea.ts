import { defineRecipe } from '@chakra-ui/react';

export const textareaRecipe = defineRecipe({
  base: {
    display: 'flex',
  },
  variants: {
    variant: {
      plain: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'transparent',
        '--focus-color': 'colors.transparent',
      },
    },
  },
});